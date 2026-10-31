// TypeScript consumer typecheck for the packed tarball (PARITY_SPEC P9.5): default `tsc` settings with
// module/moduleResolution nodenext, strict, no allowImportingTsExtensions and no Bun types.
import { TornSdk, type UserBasicResponse, type KnownEnumValue, type UserGenderEnum, isRetryable } from "torn-ts-sdk";
import { mockSdk, jsonResponse } from "torn-ts-sdk/testing";
import type { FactionTerritoryWarResultEnum } from "torn-ts-sdk/generated";
import type { manual } from "torn-ts-sdk/models";

export async function consumer(): Promise<string> {
  const sdk: TornSdk = TornSdk.withApiKeys(["key"], { validation: "strict" });
  const basic: Promise<UserBasicResponse> = sdk.openapi().getMyBasicInformation();
  void basic.catch((error: unknown) => isRetryable(error));
  const open: UserGenderEnum = "Futuregender";
  const known: KnownEnumValue<"UserGenderEnum"> = "Male";
  const result: FactionTerritoryWarResultEnum = "end_with_dirty_bomb";
  const mock = mockSdk([jsonResponse({})]);
  const profile: manual.UserProfileBundle = await mock.sdk.user().profile();
  return `${open}${known}${result}${profile.profile.name}`;
}
