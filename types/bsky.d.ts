// declare module "BskyTypes" {
//   export interface Feed {
//     post: Post;
//     reply?: {
//       parent: Post;
//       root: Post;
//     };
//     reason?: Reason.Repost;
//   }

//   export interface Post {
//     uri: string;
//     cid: string;
//     author: Actor;
//     record: Record.Post;
//     embed?: Embed.Any;
//     replyCount: number;
//     repostCount: number;
//     upvoteCount: number;
//     downvoteCount: number;
//     indexedAt: string;
//     viewer: Viewer.Post;
//   }

//   export interface Actor {
//     did: string;
//     declaration: Declaration;
//     handle: string;
//     displayName?: string;
//     avatar?: string;
//     viewer?: Viewer.Actor;
//   }

//   export interface ActorDetail {
//     did: string;
//     declaration: Declaration;
//     handle: string;
//     displayName?: string;
//     description?: string;
//     avatar?: string;
//     indexedAt?: string;
//     viewer?: Viewer.Actor;
//   }

//   export interface ActorProfile {
//     did: string;
//     declaration: Declaration;
//     handle: string;
//     displayName?: string;
//     description?: string;
//     avatar?: string;
//     banner?: string;
//     followersCount: number;
//     followsCount: number;
//     postsCount: number;
//     creator: string;
//     indexedAt?: string;
//     viewer?: Viewer.Actor;
//     myState?: {
//       follow?: string;
//       muted?: boolean;
//     };
//   }

//   export interface Declaration {
//     cid: string;
//     actorType: "app.bsky.system.actorUser";
//   }

//   export namespace Reason {
//     export interface Repost {
//       by: Actor;
//       indexedAt: string;
//     }
//   }

//   export namespace Embed {
//     export type Any =
//       | Embed.Image
//       | Embed.External
//       | Embed.Record
//       | Embed.RecordNotFound;

//     export interface Image {
//       images: {
//         thumb: string;
//         fullsize: string;
//         alt: string;
//       }[];
//     }
//     // export const isImage = (
//     //   embed: Embed.Any | undefined | null
//     // ): embed is Embed.Image => !!(embed && (embed as any).images);

//     export interface External {
//       external: {
//         uri: string;
//         title: string;
//         description: string;
//         thumb?: string;
//       };
//     }
//     // export const isExternal = (
//     //   embed: Embed.Any | undefined | null
//     // ): embed is Embed.External => !!(embed && (embed as any).external);

//     export interface Record {
//       record: {
//         uri: string;
//         cid: string;
//         author: Actor;
//         record: Record.Post;
//       };
//     }
//     // export const isRecord = (
//     //   embed: Embed.Any | undefined | null
//     // ): embed is Embed.Record => !!(embed && (embed as any).record?.cid);

//     export interface RecordNotFound {
//       record: {
//         uri: string;
//       };
//     }
//     // export const isRecordNotFound = (
//     //   embed: Embed.Any | undefined | null
//     // ): embed is Embed.RecordNotFound =>
//     //   !!(embed && (embed as any).record) && !(embed as any).record?.cid;
//   }

//   export namespace Viewer {
//     export interface Actor {
//       muted?: boolean;
//       following?: string;
//       followedBy?: string;
//     }

//     export interface Post {
//       repost?: string;
//       upvote?: string;
//       downvote?: string;
//     }
//   }

//   export namespace Record {
//     export interface Post {
//       createdAt: string;
//       text: string;
//       embed?: {
//         external?: Embed.External;
//       };
//       entities?: Entity[];
//       reply?: ReplyRef;
//     }

//     export interface Vote {
//       createdAt: string;
//       direction: "up" | "down";
//       subject: { cid: string; uri: string };
//     }

//     export interface Repost {
//       createdAt: string;
//       subject: { cid: string; uri: string };
//     }

//     export interface Follow {
//       createdAt: string;
//       subject: { declarationCid: string; did: string };
//     }
//   }

//   export interface Entity {
//     type: "link" | "mention";
//     index: { start: number; end: number };
//     value: string;
//   }

//   export interface ReplyRef {
//     root: {
//       cid: string;
//       uri: string;
//     };
//     parent: {
//       cid: string;
//       uri: string;
//     };
//   }

//   export type PostThread =
//     | {
//       notFound: undefined; // Not actually present, but for convenience.
//       post: Post;
//       parent?: PostThread;
//       replies?: PostThread[];
//     }
//     | {
//       notFound: true;
//       uri: string;
//     };

//   type NotificationOf<K, R> = {
//     uri: string;
//     cid: string;
//     author: Actor;
//     reason: K;
//     reasonSubject?: string;
//     record: R;
//     isRead: boolean;
//     indexedAt: string;
//   };

//   export type VoteNotification = NotificationOf<"vote", Record.Vote>;
//   export type RepostNotification = NotificationOf<"repost", Record.Repost>;
//   export type FollowNotification = NotificationOf<"follow", Record.Follow>;
//   export type MentionNotification = NotificationOf<"mention", Record.Post>;
//   export type ReplyNotification = NotificationOf<"reply", Record.Post>;

//   export type Notification =
//     | VoteNotification
//     | RepostNotification
//     | FollowNotification
//     | MentionNotification
//     | ReplyNotification;

// }
