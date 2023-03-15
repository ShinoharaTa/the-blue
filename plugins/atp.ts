import { Plugin, Context } from '@nuxt/types'
import { AtpAgent, AtpSessionData } from '@atproto/api'

const COOKIE_KEY = 'AozoraUserData'

declare module 'vue/types/vue' {
  interface Vue {
    $atp: atProtoInterface
  }
}

declare module '@nuxt/types' {
  interface Context {
    $atp: typeof atproto
  }
}

class atproto implements atProtoInterface {
  private agent: AtpAgent
  private me: any
  private ctx
  constructor(ctx: Context) {
    this.ctx = ctx
    this.agent = new AtpAgent({
      service: 'https://bsky.social',
      persistSession: (evt, sess) => {
        console.log('** 1:', typeof sess)
        this.ctx.app.$cookies.set(COOKIE_KEY, sess, {
          maxAge: 60 * 60 * 24 * 7,
        })
      },
    })
  }

  async login(identifier: string, password: string) {
    try {
      const { success, data } = await this.agent.login({
        identifier: identifier,
        password: password,
      })
      this.me = data
      return success ? data : null
    } catch {
      return null
    }
  }
  async hasSession() {
    const session = (() => {
      try {
        const sessStr: AtpSessionData = this.ctx.app.$cookies.get(COOKIE_KEY)
        if (!sessStr) {
          return null
        }
        return sessStr
      } catch {
        return null
      }
    })()
    if (!session) {
      return { success: false }
    }

    const { success, data } = await this.agent.resumeSession(session)
    try {
      this.me = data
      return success ? data : null
    } catch {
      this.ctx.app.$router.push('/login')
      return null
    }
  }
  async getTimeline(params: { limit?: number; cursor?: string }) {
    try {
      const { success, data } = await this.agent.api.app.bsky.feed.getTimeline(
        params
      )
      return success ? data : null
    } catch {
      return null
    }
  }

  async getPost(params: { uri: string }) {
    const response = await this.getPostThread({ ...params, depth: 0 })
    if (!response?.thread.notFound) {
      return response?.thread.post
    } else {
      return null
    }
  }
  async getPostThread(params: { uri: string; depth?: number }) {
    const { success, data } = await this.agent.api.app.bsky.feed.getPostThread(
      params
    )
    return success ? data : null
  }

  async post(
    text: string,
    urls?: { url: string; indices: [number, number] }[]
    // reply?: ReplyRef;
  ) {
    // const { text, reply, urls = [] } = params

    return this.agent.api.app.bsky.feed.post.create(
      { did: this.me.did },
      {
        text,
        entities: urls?.map(({ url, indices }) => ({
          type: 'link',
          index: {
            start: indices[0],
            end: indices[1],
          },
          value: url,
        })),
        // reply: null,
        createdAt: new Date().toISOString(),
      }
    )
  }

  async repost(params: { uri: string; cid: string }) {
    let res = this.agent.api.app.bsky.feed.repost.create(
      { did: this.me?.did },
      {
        subject: params,
        direction: 'up',
        createdAt: new Date().toISOString(),
      }
    )
    return res;
  }

  async upvote(params: { uri: string; cid: string }) {
    let res = this.agent.api.app.bsky.feed.vote.create(
      { did: this.me?.did },
      {
        subject: params,
        direction: 'up',
        createdAt: new Date().toISOString(),
      }
    )
    return res;
  }
}

const atp: Plugin = (context: Context, inject) => {
  const instance = new atproto(context) as atProtoInterface
  inject('atp', instance)
}

export default atp

export interface atProtoInterface {
  login(identifier: string, password: string): any
  hasSession(): any
  getTimeline(params: { limit?: number; cursor?: string }): any
  getPost(params: { uri: string }): any
  getPostThread(params: { uri: string; depth?: number }): any
  post(text: string, urls?: { url: string; indices: [number, number] }[]): any
  repost(params: { uri: string; cid: string }): any
  upvote(params: { uri: string; cid: string }): any
}

export interface Feed {
  post: Post;
  reply?: {
    parent: Post;
    root: Post;
  };
  reason?: Reason.Repost;
}

export interface Post {
  uri: string;
  cid: string;
  author: Actor;
  record: Record.Post;
  embed?: Embed.Any;
  replyCount: number;
  repostCount: number;
  upvoteCount: number;
  downvoteCount: number;
  indexedAt: string;
  viewer: Viewer.Post;
}

export interface Actor {
  did: string;
  declaration: Declaration;
  handle: string;
  displayName?: string;
  avatar?: string;
  viewer?: Viewer.Actor;
}

export interface ActorDetail {
  did: string;
  declaration: Declaration;
  handle: string;
  displayName?: string;
  description?: string;
  avatar?: string;
  indexedAt?: string;
  viewer?: Viewer.Actor;
}

export interface ActorProfile {
  did: string;
  declaration: Declaration;
  handle: string;
  displayName?: string;
  description?: string;
  avatar?: string;
  banner?: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  creator: string;
  indexedAt?: string;
  viewer?: Viewer.Actor;
  myState?: {
    follow?: string;
    muted?: boolean;
  };
}

export interface Declaration {
  cid: string;
  actorType: "app.bsky.system.actorUser";
}

export namespace Reason {
  export interface Repost {
    by: Actor;
    indexedAt: string;
  }
}

export namespace Embed {
  export type Any =
    | Embed.Image
    | Embed.External
    | Embed.Record
    | Embed.RecordNotFound;

  export interface Image {
    images: {
      thumb: string;
      fullsize: string;
      alt: string;
    }[];
  }
  export const isImage = (
    embed: Embed.Any | undefined | null
  ): embed is Embed.Image => !!(embed && (embed as any).images);

  export interface External {
    external: {
      uri: string;
      title: string;
      description: string;
      thumb?: string;
    };
  }
  export const isExternal = (
    embed: Embed.Any | undefined | null
  ): embed is Embed.External => !!(embed && (embed as any).external);

  export interface Record {
    record: {
      uri: string;
      cid: string;
      author: Actor;
      record: Record.Post;
    };
  }
  export const isRecord = (
    embed: Embed.Any | undefined | null
  ): embed is Embed.Record => !!(embed && (embed as any).record?.cid);

  export interface RecordNotFound {
    record: {
      uri: string;
    };
  }
  export const isRecordNotFound = (
    embed: Embed.Any | undefined | null
  ): embed is Embed.RecordNotFound =>
    !!(embed && (embed as any).record) && !(embed as any).record?.cid;
}

export namespace Viewer {
  export interface Actor {
    muted?: boolean;
    following?: string;
    followedBy?: string;
  }

  export interface Post {
    repost?: string;
    upvote?: string;
    downvote?: string;
  }
}

export namespace Record {
  export interface Post {
    createdAt: string;
    text: string;
    embed?: {
      external?: Embed.External;
    };
    entities?: Entity[];
    reply?: ReplyRef;
  }

  export interface Vote {
    createdAt: string;
    direction: "up" | "down";
    subject: { cid: string; uri: string };
  }

  export interface Repost {
    createdAt: string;
    subject: { cid: string; uri: string };
  }

  export interface Follow {
    createdAt: string;
    subject: { declarationCid: string; did: string };
  }
}

export interface Entity {
  type: "link" | "mention";
  index: { start: number; end: number };
  value: string;
}

export interface ReplyRef {
  root: {
    cid: string;
    uri: string;
  };
  parent: {
    cid: string;
    uri: string;
  };
}

export type PostThread =
  | {
      notFound: undefined; // Not actually present, but for convenience.
      post: Post;
      parent?: PostThread;
      replies?: PostThread[];
    }
  | {
      notFound: true;
      uri: string;
    };

type NotificationOf<K, R> = {
  uri: string;
  cid: string;
  author: Actor;
  reason: K;
  reasonSubject?: string;
  record: R;
  isRead: boolean;
  indexedAt: string;
};

export type VoteNotification = NotificationOf<"vote", Record.Vote>;
export type RepostNotification = NotificationOf<"repost", Record.Repost>;
export type FollowNotification = NotificationOf<"follow", Record.Follow>;
export type MentionNotification = NotificationOf<"mention", Record.Post>;
export type ReplyNotification = NotificationOf<"reply", Record.Post>;

export type Notification =
  | VoteNotification
  | RepostNotification
  | FollowNotification
  | MentionNotification
  | ReplyNotification;