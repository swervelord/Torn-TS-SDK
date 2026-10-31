import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { ForumOptions } from "./options.ts";
import type { ForumCategoriesBundle, ForumLookupBundle, ForumPostsBundle, ForumThreadBundle, ForumThreadsBundle, ForumTimestampBundle } from "../models/manual.ts";
export { ForumOptions } from "./options.ts";

export class ForumApi extends ResourceApi<ForumOptions, "forum"> {
  static readonly SUPPORTED_SELECTIONS = ["thread", "threads", "timestamp", "categories", "lookup", "posts"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "forum", ForumApi.SUPPORTED_SELECTIONS, () => new ForumOptions()); }
  async thread(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<ForumThreadBundle> {
    return this.executeTyped<ForumThreadBundle>("thread", options, "ForumThreadBundle", true);
  }
  async categories(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<ForumCategoriesBundle> {
    return this.executeTyped<ForumCategoriesBundle>("categories", options, "ForumCategoriesBundle", true);
  }
  async lookup(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<ForumLookupBundle> {
    return this.executeTyped<ForumLookupBundle>("lookup", options, "ForumLookupBundle", true);
  }
  async threads(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<ForumThreadsBundle> {
    return this.executeTyped<ForumThreadsBundle>("threads", options, "ForumThreadsBundle", true);
  }
  async posts(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<ForumPostsBundle> {
    return this.executeTyped<ForumPostsBundle>("posts", options, "ForumPostsBundle", true);
  }
  async timestamp(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<ForumTimestampBundle> {
    return this.executeTyped<ForumTimestampBundle>("timestamp", options, "ForumTimestampBundle", true);
  }
  /** @deprecated Use threadRaw(). */
  thread_raw(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("thread", options); }
  /** @deprecated Use threadsRaw(). */
  threads_raw(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("threads", options); }
  /** @deprecated Use timestampRaw(). */
  timestamp_raw(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  /** @deprecated Use categoriesRaw(). */
  categories_raw(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("categories", options); }
  /** @deprecated Use lookupRaw(). */
  lookup_raw(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  /** @deprecated Use postsRaw(). */
  posts_raw(options: OptionsOrId<ForumOptions> = new ForumOptions()): Promise<RawSelectionBundle> { return this.rawSelection("posts", options); }
  threadRaw(options: OptionsOrId<ForumOptions> = new ForumOptions()) { return this.thread_raw(options); }
  threadsRaw(options: OptionsOrId<ForumOptions> = new ForumOptions()) { return this.threads_raw(options); }
  timestampRaw(options: OptionsOrId<ForumOptions> = new ForumOptions()) { return this.timestamp_raw(options); }
  categoriesRaw(options: OptionsOrId<ForumOptions> = new ForumOptions()) { return this.categories_raw(options); }
  lookupRaw(options: OptionsOrId<ForumOptions> = new ForumOptions()) { return this.lookup_raw(options); }
  postsRaw(options: OptionsOrId<ForumOptions> = new ForumOptions()) { return this.posts_raw(options); }
}
