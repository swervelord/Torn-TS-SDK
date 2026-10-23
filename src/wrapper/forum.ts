import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle } from "./runtime.ts";
import { ForumOptions } from "./options.ts";
import type { ForumCategoriesBundle, ForumLookupBundle, ForumPostsBundle, ForumThreadBundle, ForumThreadsBundle, ForumTimestampBundle } from "../models/manual.ts";
export { ForumOptions } from "./options.ts";

export class ForumApi extends ResourceApi<ForumOptions, "forum"> {
  static readonly SUPPORTED_SELECTIONS = ["thread", "threads", "timestamp", "categories", "lookup", "posts"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "forum", ForumApi.SUPPORTED_SELECTIONS, () => new ForumOptions()); }
  async thread(options: ForumOptions = new ForumOptions()): Promise<ForumThreadBundle> {
    return this.executeTyped<ForumThreadBundle>("thread", options, "ForumThreadBundle", true);
  }
  async categories(options: ForumOptions = new ForumOptions()): Promise<ForumCategoriesBundle> {
    return this.executeTyped<ForumCategoriesBundle>("categories", options, "ForumCategoriesBundle", true);
  }
  async lookup(options: ForumOptions = new ForumOptions()): Promise<ForumLookupBundle> {
    return this.executeTyped<ForumLookupBundle>("lookup", options, "ForumLookupBundle", true);
  }
  async threads(options: ForumOptions = new ForumOptions()): Promise<ForumThreadsBundle> {
    return this.executeTyped<ForumThreadsBundle>("threads", options, "ForumThreadsBundle", true);
  }
  async posts(options: ForumOptions = new ForumOptions()): Promise<ForumPostsBundle> {
    return this.executeTyped<ForumPostsBundle>("posts", options, "ForumPostsBundle", true);
  }
  async timestamp(options: ForumOptions = new ForumOptions()): Promise<ForumTimestampBundle> {
    return this.executeTyped<ForumTimestampBundle>("timestamp", options, "ForumTimestampBundle", true);
  }
  thread_raw(options: ForumOptions = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("thread", options); }
  threads_raw(options: ForumOptions = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("threads", options); }
  timestamp_raw(options: ForumOptions = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  categories_raw(options: ForumOptions = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("categories", options); }
  lookup_raw(options: ForumOptions = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  posts_raw(options: ForumOptions = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("posts", options); }
  threadRaw(options: ForumOptions = new ForumOptions()) { return this.thread_raw(options); }
  threadsRaw(options: ForumOptions = new ForumOptions()) { return this.threads_raw(options); }
  timestampRaw(options: ForumOptions = new ForumOptions()) { return this.timestamp_raw(options); }
  categoriesRaw(options: ForumOptions = new ForumOptions()) { return this.categories_raw(options); }
  lookupRaw(options: ForumOptions = new ForumOptions()) { return this.lookup_raw(options); }
  postsRaw(options: ForumOptions = new ForumOptions()) { return this.posts_raw(options); }
}
