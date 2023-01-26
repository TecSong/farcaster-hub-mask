/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientReadableStream,
  ClientUnaryCall,
  handleServerStreamingCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { IdRegistryEvent } from "./id_registry_event";
import {
  CastId,
  Message,
  ReactionType,
  reactionTypeFromJSON,
  reactionTypeToJSON,
  UserDataType,
  userDataTypeFromJSON,
  userDataTypeToJSON,
  UserId,
} from "./message";
import { NameRegistryEvent } from "./name_registry_event";

export interface Empty {
}

/** Response Types for the Sync RPC Methods */
export interface HubInfoResponse {
  version: string;
  isSynced: boolean;
  nickname: string;
  rootHash: Uint8Array;
}

export interface TrieNodeMetadataResponse {
  prefix: Uint8Array;
  numMessages: number;
  hash: Uint8Array;
  children: TrieNodeMetadataResponse[];
}

export interface TrieNodeSnapshotResponse {
  prefix: Uint8Array;
  excludedHashes: string[];
  numMessages: number;
  rootHash: Uint8Array;
}

export interface TrieNodePrefix {
  prefix: Uint8Array;
}

export interface SyncIds {
  syncIds: string[];
}

export interface FidRequest {
  fid: number;
}

export interface FidsResponse {
  fids: number[];
}

export interface ReactionRequest {
  fid: number;
  reactionType: ReactionType;
  castId: CastId | undefined;
}

export interface ReactionsByFidRequest {
  fid: number;
  reactionType: ReactionType;
}

export interface ReactionsByCastRequest {
  castId: CastId | undefined;
  reactionType: ReactionType;
}

export interface AmpRequest {
  fid: number;
  userId: UserId | undefined;
}

export interface UserDataRequest {
  fid: number;
  userDataType: UserDataType;
}

export interface NameRegistryEventRequest {
  name: string;
}

export interface VerificationRequest {
  fid: number;
  address: Uint8Array;
}

export interface SignerRequest {
  fid: number;
  signer: Uint8Array;
}

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseHubInfoResponse(): HubInfoResponse {
  return { version: "", isSynced: false, nickname: "", rootHash: new Uint8Array() };
}

export const HubInfoResponse = {
  encode(message: HubInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.isSynced === true) {
      writer.uint32(16).bool(message.isSynced);
    }
    if (message.nickname !== "") {
      writer.uint32(26).string(message.nickname);
    }
    if (message.rootHash.length !== 0) {
      writer.uint32(34).bytes(message.rootHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HubInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHubInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.isSynced = reader.bool();
          break;
        case 3:
          message.nickname = reader.string();
          break;
        case 4:
          message.rootHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HubInfoResponse {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      isSynced: isSet(object.isSynced) ? Boolean(object.isSynced) : false,
      nickname: isSet(object.nickname) ? String(object.nickname) : "",
      rootHash: isSet(object.rootHash) ? bytesFromBase64(object.rootHash) : new Uint8Array(),
    };
  },

  toJSON(message: HubInfoResponse): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.isSynced !== undefined && (obj.isSynced = message.isSynced);
    message.nickname !== undefined && (obj.nickname = message.nickname);
    message.rootHash !== undefined &&
      (obj.rootHash = base64FromBytes(message.rootHash !== undefined ? message.rootHash : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<HubInfoResponse>, I>>(base?: I): HubInfoResponse {
    return HubInfoResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HubInfoResponse>, I>>(object: I): HubInfoResponse {
    const message = createBaseHubInfoResponse();
    message.version = object.version ?? "";
    message.isSynced = object.isSynced ?? false;
    message.nickname = object.nickname ?? "";
    message.rootHash = object.rootHash ?? new Uint8Array();
    return message;
  },
};

function createBaseTrieNodeMetadataResponse(): TrieNodeMetadataResponse {
  return { prefix: new Uint8Array(), numMessages: 0, hash: new Uint8Array(), children: [] };
}

export const TrieNodeMetadataResponse = {
  encode(message: TrieNodeMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.prefix.length !== 0) {
      writer.uint32(10).bytes(message.prefix);
    }
    if (message.numMessages !== 0) {
      writer.uint32(16).uint64(message.numMessages);
    }
    if (message.hash.length !== 0) {
      writer.uint32(26).bytes(message.hash);
    }
    for (const v of message.children) {
      TrieNodeMetadataResponse.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrieNodeMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrieNodeMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prefix = reader.bytes();
          break;
        case 2:
          message.numMessages = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.hash = reader.bytes();
          break;
        case 4:
          message.children.push(TrieNodeMetadataResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrieNodeMetadataResponse {
    return {
      prefix: isSet(object.prefix) ? bytesFromBase64(object.prefix) : new Uint8Array(),
      numMessages: isSet(object.numMessages) ? Number(object.numMessages) : 0,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(),
      children: Array.isArray(object?.children)
        ? object.children.map((e: any) => TrieNodeMetadataResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TrieNodeMetadataResponse): unknown {
    const obj: any = {};
    message.prefix !== undefined &&
      (obj.prefix = base64FromBytes(message.prefix !== undefined ? message.prefix : new Uint8Array()));
    message.numMessages !== undefined && (obj.numMessages = Math.round(message.numMessages));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
    if (message.children) {
      obj.children = message.children.map((e) => e ? TrieNodeMetadataResponse.toJSON(e) : undefined);
    } else {
      obj.children = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TrieNodeMetadataResponse>, I>>(base?: I): TrieNodeMetadataResponse {
    return TrieNodeMetadataResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TrieNodeMetadataResponse>, I>>(object: I): TrieNodeMetadataResponse {
    const message = createBaseTrieNodeMetadataResponse();
    message.prefix = object.prefix ?? new Uint8Array();
    message.numMessages = object.numMessages ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    message.children = object.children?.map((e) => TrieNodeMetadataResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTrieNodeSnapshotResponse(): TrieNodeSnapshotResponse {
  return { prefix: new Uint8Array(), excludedHashes: [], numMessages: 0, rootHash: new Uint8Array() };
}

export const TrieNodeSnapshotResponse = {
  encode(message: TrieNodeSnapshotResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.prefix.length !== 0) {
      writer.uint32(10).bytes(message.prefix);
    }
    for (const v of message.excludedHashes) {
      writer.uint32(18).string(v!);
    }
    if (message.numMessages !== 0) {
      writer.uint32(24).uint64(message.numMessages);
    }
    if (message.rootHash.length !== 0) {
      writer.uint32(34).bytes(message.rootHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrieNodeSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrieNodeSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prefix = reader.bytes();
          break;
        case 2:
          message.excludedHashes.push(reader.string());
          break;
        case 3:
          message.numMessages = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.rootHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrieNodeSnapshotResponse {
    return {
      prefix: isSet(object.prefix) ? bytesFromBase64(object.prefix) : new Uint8Array(),
      excludedHashes: Array.isArray(object?.excludedHashes) ? object.excludedHashes.map((e: any) => String(e)) : [],
      numMessages: isSet(object.numMessages) ? Number(object.numMessages) : 0,
      rootHash: isSet(object.rootHash) ? bytesFromBase64(object.rootHash) : new Uint8Array(),
    };
  },

  toJSON(message: TrieNodeSnapshotResponse): unknown {
    const obj: any = {};
    message.prefix !== undefined &&
      (obj.prefix = base64FromBytes(message.prefix !== undefined ? message.prefix : new Uint8Array()));
    if (message.excludedHashes) {
      obj.excludedHashes = message.excludedHashes.map((e) => e);
    } else {
      obj.excludedHashes = [];
    }
    message.numMessages !== undefined && (obj.numMessages = Math.round(message.numMessages));
    message.rootHash !== undefined &&
      (obj.rootHash = base64FromBytes(message.rootHash !== undefined ? message.rootHash : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<TrieNodeSnapshotResponse>, I>>(base?: I): TrieNodeSnapshotResponse {
    return TrieNodeSnapshotResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TrieNodeSnapshotResponse>, I>>(object: I): TrieNodeSnapshotResponse {
    const message = createBaseTrieNodeSnapshotResponse();
    message.prefix = object.prefix ?? new Uint8Array();
    message.excludedHashes = object.excludedHashes?.map((e) => e) || [];
    message.numMessages = object.numMessages ?? 0;
    message.rootHash = object.rootHash ?? new Uint8Array();
    return message;
  },
};

function createBaseTrieNodePrefix(): TrieNodePrefix {
  return { prefix: new Uint8Array() };
}

export const TrieNodePrefix = {
  encode(message: TrieNodePrefix, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.prefix.length !== 0) {
      writer.uint32(10).bytes(message.prefix);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrieNodePrefix {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrieNodePrefix();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prefix = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrieNodePrefix {
    return { prefix: isSet(object.prefix) ? bytesFromBase64(object.prefix) : new Uint8Array() };
  },

  toJSON(message: TrieNodePrefix): unknown {
    const obj: any = {};
    message.prefix !== undefined &&
      (obj.prefix = base64FromBytes(message.prefix !== undefined ? message.prefix : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<TrieNodePrefix>, I>>(base?: I): TrieNodePrefix {
    return TrieNodePrefix.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TrieNodePrefix>, I>>(object: I): TrieNodePrefix {
    const message = createBaseTrieNodePrefix();
    message.prefix = object.prefix ?? new Uint8Array();
    return message;
  },
};

function createBaseSyncIds(): SyncIds {
  return { syncIds: [] };
}

export const SyncIds = {
  encode(message: SyncIds, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.syncIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SyncIds {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSyncIds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.syncIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SyncIds {
    return { syncIds: Array.isArray(object?.syncIds) ? object.syncIds.map((e: any) => String(e)) : [] };
  },

  toJSON(message: SyncIds): unknown {
    const obj: any = {};
    if (message.syncIds) {
      obj.syncIds = message.syncIds.map((e) => e);
    } else {
      obj.syncIds = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SyncIds>, I>>(base?: I): SyncIds {
    return SyncIds.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SyncIds>, I>>(object: I): SyncIds {
    const message = createBaseSyncIds();
    message.syncIds = object.syncIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseFidRequest(): FidRequest {
  return { fid: 0 };
}

export const FidRequest = {
  encode(message: FidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fid !== 0) {
      writer.uint32(8).uint64(message.fid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FidRequest {
    return { fid: isSet(object.fid) ? Number(object.fid) : 0 };
  },

  toJSON(message: FidRequest): unknown {
    const obj: any = {};
    message.fid !== undefined && (obj.fid = Math.round(message.fid));
    return obj;
  },

  create<I extends Exact<DeepPartial<FidRequest>, I>>(base?: I): FidRequest {
    return FidRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FidRequest>, I>>(object: I): FidRequest {
    const message = createBaseFidRequest();
    message.fid = object.fid ?? 0;
    return message;
  },
};

function createBaseFidsResponse(): FidsResponse {
  return { fids: [] };
}

export const FidsResponse = {
  encode(message: FidsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.fids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FidsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFidsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.fids.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.fids.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FidsResponse {
    return { fids: Array.isArray(object?.fids) ? object.fids.map((e: any) => Number(e)) : [] };
  },

  toJSON(message: FidsResponse): unknown {
    const obj: any = {};
    if (message.fids) {
      obj.fids = message.fids.map((e) => Math.round(e));
    } else {
      obj.fids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FidsResponse>, I>>(base?: I): FidsResponse {
    return FidsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FidsResponse>, I>>(object: I): FidsResponse {
    const message = createBaseFidsResponse();
    message.fids = object.fids?.map((e) => e) || [];
    return message;
  },
};

function createBaseReactionRequest(): ReactionRequest {
  return { fid: 0, reactionType: 0, castId: undefined };
}

export const ReactionRequest = {
  encode(message: ReactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fid !== 0) {
      writer.uint32(8).uint64(message.fid);
    }
    if (message.reactionType !== 0) {
      writer.uint32(16).int32(message.reactionType);
    }
    if (message.castId !== undefined) {
      CastId.encode(message.castId, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReactionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.reactionType = reader.int32() as any;
          break;
        case 3:
          message.castId = CastId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReactionRequest {
    return {
      fid: isSet(object.fid) ? Number(object.fid) : 0,
      reactionType: isSet(object.reactionType) ? reactionTypeFromJSON(object.reactionType) : 0,
      castId: isSet(object.castId) ? CastId.fromJSON(object.castId) : undefined,
    };
  },

  toJSON(message: ReactionRequest): unknown {
    const obj: any = {};
    message.fid !== undefined && (obj.fid = Math.round(message.fid));
    message.reactionType !== undefined && (obj.reactionType = reactionTypeToJSON(message.reactionType));
    message.castId !== undefined && (obj.castId = message.castId ? CastId.toJSON(message.castId) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ReactionRequest>, I>>(base?: I): ReactionRequest {
    return ReactionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReactionRequest>, I>>(object: I): ReactionRequest {
    const message = createBaseReactionRequest();
    message.fid = object.fid ?? 0;
    message.reactionType = object.reactionType ?? 0;
    message.castId = (object.castId !== undefined && object.castId !== null)
      ? CastId.fromPartial(object.castId)
      : undefined;
    return message;
  },
};

function createBaseReactionsByFidRequest(): ReactionsByFidRequest {
  return { fid: 0, reactionType: 0 };
}

export const ReactionsByFidRequest = {
  encode(message: ReactionsByFidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fid !== 0) {
      writer.uint32(8).uint64(message.fid);
    }
    if (message.reactionType !== 0) {
      writer.uint32(16).int32(message.reactionType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReactionsByFidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReactionsByFidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.reactionType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReactionsByFidRequest {
    return {
      fid: isSet(object.fid) ? Number(object.fid) : 0,
      reactionType: isSet(object.reactionType) ? reactionTypeFromJSON(object.reactionType) : 0,
    };
  },

  toJSON(message: ReactionsByFidRequest): unknown {
    const obj: any = {};
    message.fid !== undefined && (obj.fid = Math.round(message.fid));
    message.reactionType !== undefined && (obj.reactionType = reactionTypeToJSON(message.reactionType));
    return obj;
  },

  create<I extends Exact<DeepPartial<ReactionsByFidRequest>, I>>(base?: I): ReactionsByFidRequest {
    return ReactionsByFidRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReactionsByFidRequest>, I>>(object: I): ReactionsByFidRequest {
    const message = createBaseReactionsByFidRequest();
    message.fid = object.fid ?? 0;
    message.reactionType = object.reactionType ?? 0;
    return message;
  },
};

function createBaseReactionsByCastRequest(): ReactionsByCastRequest {
  return { castId: undefined, reactionType: 0 };
}

export const ReactionsByCastRequest = {
  encode(message: ReactionsByCastRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.castId !== undefined) {
      CastId.encode(message.castId, writer.uint32(10).fork()).ldelim();
    }
    if (message.reactionType !== 0) {
      writer.uint32(16).int32(message.reactionType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReactionsByCastRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReactionsByCastRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.castId = CastId.decode(reader, reader.uint32());
          break;
        case 2:
          message.reactionType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReactionsByCastRequest {
    return {
      castId: isSet(object.castId) ? CastId.fromJSON(object.castId) : undefined,
      reactionType: isSet(object.reactionType) ? reactionTypeFromJSON(object.reactionType) : 0,
    };
  },

  toJSON(message: ReactionsByCastRequest): unknown {
    const obj: any = {};
    message.castId !== undefined && (obj.castId = message.castId ? CastId.toJSON(message.castId) : undefined);
    message.reactionType !== undefined && (obj.reactionType = reactionTypeToJSON(message.reactionType));
    return obj;
  },

  create<I extends Exact<DeepPartial<ReactionsByCastRequest>, I>>(base?: I): ReactionsByCastRequest {
    return ReactionsByCastRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReactionsByCastRequest>, I>>(object: I): ReactionsByCastRequest {
    const message = createBaseReactionsByCastRequest();
    message.castId = (object.castId !== undefined && object.castId !== null)
      ? CastId.fromPartial(object.castId)
      : undefined;
    message.reactionType = object.reactionType ?? 0;
    return message;
  },
};

function createBaseAmpRequest(): AmpRequest {
  return { fid: 0, userId: undefined };
}

export const AmpRequest = {
  encode(message: AmpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fid !== 0) {
      writer.uint32(8).uint64(message.fid);
    }
    if (message.userId !== undefined) {
      UserId.encode(message.userId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AmpRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAmpRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.userId = UserId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AmpRequest {
    return {
      fid: isSet(object.fid) ? Number(object.fid) : 0,
      userId: isSet(object.userId) ? UserId.fromJSON(object.userId) : undefined,
    };
  },

  toJSON(message: AmpRequest): unknown {
    const obj: any = {};
    message.fid !== undefined && (obj.fid = Math.round(message.fid));
    message.userId !== undefined && (obj.userId = message.userId ? UserId.toJSON(message.userId) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AmpRequest>, I>>(base?: I): AmpRequest {
    return AmpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AmpRequest>, I>>(object: I): AmpRequest {
    const message = createBaseAmpRequest();
    message.fid = object.fid ?? 0;
    message.userId = (object.userId !== undefined && object.userId !== null)
      ? UserId.fromPartial(object.userId)
      : undefined;
    return message;
  },
};

function createBaseUserDataRequest(): UserDataRequest {
  return { fid: 0, userDataType: 0 };
}

export const UserDataRequest = {
  encode(message: UserDataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fid !== 0) {
      writer.uint32(8).uint64(message.fid);
    }
    if (message.userDataType !== 0) {
      writer.uint32(16).int32(message.userDataType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.userDataType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserDataRequest {
    return {
      fid: isSet(object.fid) ? Number(object.fid) : 0,
      userDataType: isSet(object.userDataType) ? userDataTypeFromJSON(object.userDataType) : 0,
    };
  },

  toJSON(message: UserDataRequest): unknown {
    const obj: any = {};
    message.fid !== undefined && (obj.fid = Math.round(message.fid));
    message.userDataType !== undefined && (obj.userDataType = userDataTypeToJSON(message.userDataType));
    return obj;
  },

  create<I extends Exact<DeepPartial<UserDataRequest>, I>>(base?: I): UserDataRequest {
    return UserDataRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserDataRequest>, I>>(object: I): UserDataRequest {
    const message = createBaseUserDataRequest();
    message.fid = object.fid ?? 0;
    message.userDataType = object.userDataType ?? 0;
    return message;
  },
};

function createBaseNameRegistryEventRequest(): NameRegistryEventRequest {
  return { name: "" };
}

export const NameRegistryEventRequest = {
  encode(message: NameRegistryEventRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NameRegistryEventRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameRegistryEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NameRegistryEventRequest {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: NameRegistryEventRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<NameRegistryEventRequest>, I>>(base?: I): NameRegistryEventRequest {
    return NameRegistryEventRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NameRegistryEventRequest>, I>>(object: I): NameRegistryEventRequest {
    const message = createBaseNameRegistryEventRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseVerificationRequest(): VerificationRequest {
  return { fid: 0, address: new Uint8Array() };
}

export const VerificationRequest = {
  encode(message: VerificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fid !== 0) {
      writer.uint32(8).uint64(message.fid);
    }
    if (message.address.length !== 0) {
      writer.uint32(18).bytes(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerificationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VerificationRequest {
    return {
      fid: isSet(object.fid) ? Number(object.fid) : 0,
      address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array(),
    };
  },

  toJSON(message: VerificationRequest): unknown {
    const obj: any = {};
    message.fid !== undefined && (obj.fid = Math.round(message.fid));
    message.address !== undefined &&
      (obj.address = base64FromBytes(message.address !== undefined ? message.address : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<VerificationRequest>, I>>(base?: I): VerificationRequest {
    return VerificationRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VerificationRequest>, I>>(object: I): VerificationRequest {
    const message = createBaseVerificationRequest();
    message.fid = object.fid ?? 0;
    message.address = object.address ?? new Uint8Array();
    return message;
  },
};

function createBaseSignerRequest(): SignerRequest {
  return { fid: 0, signer: new Uint8Array() };
}

export const SignerRequest = {
  encode(message: SignerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fid !== 0) {
      writer.uint32(8).uint64(message.fid);
    }
    if (message.signer.length !== 0) {
      writer.uint32(18).bytes(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.signer = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignerRequest {
    return {
      fid: isSet(object.fid) ? Number(object.fid) : 0,
      signer: isSet(object.signer) ? bytesFromBase64(object.signer) : new Uint8Array(),
    };
  },

  toJSON(message: SignerRequest): unknown {
    const obj: any = {};
    message.fid !== undefined && (obj.fid = Math.round(message.fid));
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(message.signer !== undefined ? message.signer : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<SignerRequest>, I>>(base?: I): SignerRequest {
    return SignerRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SignerRequest>, I>>(object: I): SignerRequest {
    const message = createBaseSignerRequest();
    message.fid = object.fid ?? 0;
    message.signer = object.signer ?? new Uint8Array();
    return message;
  },
};

export type HubServiceService = typeof HubServiceService;
export const HubServiceService = {
  /** Submit Methods */
  submitMessage: {
    path: "/HubService/SubmitMessage",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Message.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  subitIdRegistryEvent: {
    path: "/HubService/SubitIdRegistryEvent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: IdRegistryEvent) => Buffer.from(IdRegistryEvent.encode(value).finish()),
    requestDeserialize: (value: Buffer) => IdRegistryEvent.decode(value),
    responseSerialize: (value: IdRegistryEvent) => Buffer.from(IdRegistryEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => IdRegistryEvent.decode(value),
  },
  submitNameRegistryEvent: {
    path: "/HubService/submitNameRegistryEvent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: NameRegistryEvent) => Buffer.from(NameRegistryEvent.encode(value).finish()),
    requestDeserialize: (value: Buffer) => NameRegistryEvent.decode(value),
    responseSerialize: (value: NameRegistryEvent) => Buffer.from(NameRegistryEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => NameRegistryEvent.decode(value),
  },
  /** Casts */
  getCast: {
    path: "/HubService/GetCast",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CastId) => Buffer.from(CastId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CastId.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getCastsByFid: {
    path: "/HubService/GetCastsByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getCastsByParent: {
    path: "/HubService/GetCastsByParent",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: CastId) => Buffer.from(CastId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CastId.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getCastsByMention: {
    path: "/HubService/GetCastsByMention",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  /** Reactions */
  getReaction: {
    path: "/HubService/GetReaction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReactionRequest) => Buffer.from(ReactionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactionRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getReactionsByFid: {
    path: "/HubService/GetReactionsByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: ReactionsByFidRequest) => Buffer.from(ReactionsByFidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactionsByFidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getReactionsByCast: {
    path: "/HubService/GetReactionsByCast",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: ReactionsByCastRequest) => Buffer.from(ReactionsByCastRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactionsByCastRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  /** Amps */
  getAmp: {
    path: "/HubService/GetAmp",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AmpRequest) => Buffer.from(AmpRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AmpRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getAmpsByFid: {
    path: "/HubService/GetAmpsByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getAmpsByUser: {
    path: "/HubService/GetAmpsByUser",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: UserId) => Buffer.from(UserId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserId.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  /** User Data */
  getUserData: {
    path: "/HubService/GetUserData",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UserDataRequest) => Buffer.from(UserDataRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserDataRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getUserDataByFid: {
    path: "/HubService/GetUserDataByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getNameRegistryEvent: {
    path: "/HubService/GetNameRegistryEvent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: NameRegistryEventRequest) => Buffer.from(NameRegistryEventRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => NameRegistryEventRequest.decode(value),
    responseSerialize: (value: NameRegistryEvent) => Buffer.from(NameRegistryEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => NameRegistryEvent.decode(value),
  },
  /** Verifications */
  getVerification: {
    path: "/HubService/GetVerification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: VerificationRequest) => Buffer.from(VerificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => VerificationRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getVerificationsByFid: {
    path: "/HubService/GetVerificationsByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  /** Signer */
  getSigner: {
    path: "/HubService/GetSigner",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SignerRequest) => Buffer.from(SignerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SignerRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getSignersByFid: {
    path: "/HubService/GetSignersByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getCustodyEvent: {
    path: "/HubService/GetCustodyEvent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: IdRegistryEvent) => Buffer.from(IdRegistryEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => IdRegistryEvent.decode(value),
  },
  getFids: {
    path: "/HubService/GetFids",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: FidsResponse) => Buffer.from(FidsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => FidsResponse.decode(value),
  },
  /** Bulk Methods */
  getAllCastMessagesByFid: {
    path: "/HubService/GetAllCastMessagesByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getAllReactionMessagesByFid: {
    path: "/HubService/GetAllReactionMessagesByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getAllAmpMessagesByFid: {
    path: "/HubService/GetAllAmpMessagesByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getAllVerificationMessagesByFid: {
    path: "/HubService/GetAllVerificationMessagesByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getAllSignerMessagesByFid: {
    path: "/HubService/GetAllSignerMessagesByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getAllUserDataMessagesByFid: {
    path: "/HubService/GetAllUserDataMessagesByFid",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: FidRequest) => Buffer.from(FidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FidRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  /** Sync Methods */
  getInfo: {
    path: "/HubService/GetInfo",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: HubInfoResponse) => Buffer.from(HubInfoResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HubInfoResponse.decode(value),
  },
  getAllSyncIdsByPrefix: {
    path: "/HubService/GetAllSyncIdsByPrefix",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TrieNodePrefix) => Buffer.from(TrieNodePrefix.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TrieNodePrefix.decode(value),
    responseSerialize: (value: SyncIds) => Buffer.from(SyncIds.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SyncIds.decode(value),
  },
  getAllMessagesBySyncIds: {
    path: "/HubService/GetAllMessagesBySyncIds",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: SyncIds) => Buffer.from(SyncIds.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SyncIds.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getSyncMetadataByPrefix: {
    path: "/HubService/GetSyncMetadataByPrefix",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TrieNodePrefix) => Buffer.from(TrieNodePrefix.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TrieNodePrefix.decode(value),
    responseSerialize: (value: TrieNodeMetadataResponse) =>
      Buffer.from(TrieNodeMetadataResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TrieNodeMetadataResponse.decode(value),
  },
  getSyncSnapshotByPrefix: {
    path: "/HubService/GetSyncSnapshotByPrefix",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TrieNodePrefix) => Buffer.from(TrieNodePrefix.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TrieNodePrefix.decode(value),
    responseSerialize: (value: TrieNodeSnapshotResponse) =>
      Buffer.from(TrieNodeSnapshotResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TrieNodeSnapshotResponse.decode(value),
  },
} as const;

export interface HubServiceServer extends UntypedServiceImplementation {
  /** Submit Methods */
  submitMessage: handleUnaryCall<Message, Message>;
  subitIdRegistryEvent: handleUnaryCall<IdRegistryEvent, IdRegistryEvent>;
  submitNameRegistryEvent: handleUnaryCall<NameRegistryEvent, NameRegistryEvent>;
  /** Casts */
  getCast: handleUnaryCall<CastId, Message>;
  getCastsByFid: handleServerStreamingCall<FidRequest, Message>;
  getCastsByParent: handleServerStreamingCall<CastId, Message>;
  getCastsByMention: handleServerStreamingCall<FidRequest, Message>;
  /** Reactions */
  getReaction: handleUnaryCall<ReactionRequest, Message>;
  getReactionsByFid: handleServerStreamingCall<ReactionsByFidRequest, Message>;
  getReactionsByCast: handleServerStreamingCall<ReactionsByCastRequest, Message>;
  /** Amps */
  getAmp: handleUnaryCall<AmpRequest, Message>;
  getAmpsByFid: handleServerStreamingCall<FidRequest, Message>;
  getAmpsByUser: handleServerStreamingCall<UserId, Message>;
  /** User Data */
  getUserData: handleUnaryCall<UserDataRequest, Message>;
  getUserDataByFid: handleServerStreamingCall<FidRequest, Message>;
  getNameRegistryEvent: handleUnaryCall<NameRegistryEventRequest, NameRegistryEvent>;
  /** Verifications */
  getVerification: handleUnaryCall<VerificationRequest, Message>;
  getVerificationsByFid: handleServerStreamingCall<FidRequest, Message>;
  /** Signer */
  getSigner: handleUnaryCall<SignerRequest, Message>;
  getSignersByFid: handleServerStreamingCall<FidRequest, Message>;
  getCustodyEvent: handleUnaryCall<FidRequest, IdRegistryEvent>;
  getFids: handleUnaryCall<Empty, FidsResponse>;
  /** Bulk Methods */
  getAllCastMessagesByFid: handleServerStreamingCall<FidRequest, Message>;
  getAllReactionMessagesByFid: handleServerStreamingCall<FidRequest, Message>;
  getAllAmpMessagesByFid: handleServerStreamingCall<FidRequest, Message>;
  getAllVerificationMessagesByFid: handleServerStreamingCall<FidRequest, Message>;
  getAllSignerMessagesByFid: handleServerStreamingCall<FidRequest, Message>;
  getAllUserDataMessagesByFid: handleServerStreamingCall<FidRequest, Message>;
  /** Sync Methods */
  getInfo: handleUnaryCall<Empty, HubInfoResponse>;
  getAllSyncIdsByPrefix: handleUnaryCall<TrieNodePrefix, SyncIds>;
  getAllMessagesBySyncIds: handleServerStreamingCall<SyncIds, Message>;
  getSyncMetadataByPrefix: handleUnaryCall<TrieNodePrefix, TrieNodeMetadataResponse>;
  getSyncSnapshotByPrefix: handleUnaryCall<TrieNodePrefix, TrieNodeSnapshotResponse>;
}

export interface HubServiceClient extends Client {
  /** Submit Methods */
  submitMessage(request: Message, callback: (error: ServiceError | null, response: Message) => void): ClientUnaryCall;
  submitMessage(
    request: Message,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  submitMessage(
    request: Message,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  subitIdRegistryEvent(
    request: IdRegistryEvent,
    callback: (error: ServiceError | null, response: IdRegistryEvent) => void,
  ): ClientUnaryCall;
  subitIdRegistryEvent(
    request: IdRegistryEvent,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: IdRegistryEvent) => void,
  ): ClientUnaryCall;
  subitIdRegistryEvent(
    request: IdRegistryEvent,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: IdRegistryEvent) => void,
  ): ClientUnaryCall;
  submitNameRegistryEvent(
    request: NameRegistryEvent,
    callback: (error: ServiceError | null, response: NameRegistryEvent) => void,
  ): ClientUnaryCall;
  submitNameRegistryEvent(
    request: NameRegistryEvent,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: NameRegistryEvent) => void,
  ): ClientUnaryCall;
  submitNameRegistryEvent(
    request: NameRegistryEvent,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: NameRegistryEvent) => void,
  ): ClientUnaryCall;
  /** Casts */
  getCast(request: CastId, callback: (error: ServiceError | null, response: Message) => void): ClientUnaryCall;
  getCast(
    request: CastId,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getCast(
    request: CastId,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getCastsByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getCastsByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getCastsByParent(request: CastId, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getCastsByParent(request: CastId, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getCastsByMention(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getCastsByMention(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  /** Reactions */
  getReaction(
    request: ReactionRequest,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getReaction(
    request: ReactionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getReaction(
    request: ReactionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getReactionsByFid(request: ReactionsByFidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getReactionsByFid(
    request: ReactionsByFidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getReactionsByCast(request: ReactionsByCastRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getReactionsByCast(
    request: ReactionsByCastRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  /** Amps */
  getAmp(request: AmpRequest, callback: (error: ServiceError | null, response: Message) => void): ClientUnaryCall;
  getAmp(
    request: AmpRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getAmp(
    request: AmpRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getAmpsByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAmpsByFid(request: FidRequest, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAmpsByUser(request: UserId, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAmpsByUser(request: UserId, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  /** User Data */
  getUserData(
    request: UserDataRequest,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getUserData(
    request: UserDataRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getUserData(
    request: UserDataRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getUserDataByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getUserDataByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getNameRegistryEvent(
    request: NameRegistryEventRequest,
    callback: (error: ServiceError | null, response: NameRegistryEvent) => void,
  ): ClientUnaryCall;
  getNameRegistryEvent(
    request: NameRegistryEventRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: NameRegistryEvent) => void,
  ): ClientUnaryCall;
  getNameRegistryEvent(
    request: NameRegistryEventRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: NameRegistryEvent) => void,
  ): ClientUnaryCall;
  /** Verifications */
  getVerification(
    request: VerificationRequest,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getVerification(
    request: VerificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getVerification(
    request: VerificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getVerificationsByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getVerificationsByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  /** Signer */
  getSigner(request: SignerRequest, callback: (error: ServiceError | null, response: Message) => void): ClientUnaryCall;
  getSigner(
    request: SignerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getSigner(
    request: SignerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getSignersByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getSignersByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getCustodyEvent(
    request: FidRequest,
    callback: (error: ServiceError | null, response: IdRegistryEvent) => void,
  ): ClientUnaryCall;
  getCustodyEvent(
    request: FidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: IdRegistryEvent) => void,
  ): ClientUnaryCall;
  getCustodyEvent(
    request: FidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: IdRegistryEvent) => void,
  ): ClientUnaryCall;
  getFids(request: Empty, callback: (error: ServiceError | null, response: FidsResponse) => void): ClientUnaryCall;
  getFids(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: FidsResponse) => void,
  ): ClientUnaryCall;
  getFids(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: FidsResponse) => void,
  ): ClientUnaryCall;
  /** Bulk Methods */
  getAllCastMessagesByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAllCastMessagesByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getAllReactionMessagesByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAllReactionMessagesByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getAllAmpMessagesByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAllAmpMessagesByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getAllVerificationMessagesByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAllVerificationMessagesByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getAllSignerMessagesByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAllSignerMessagesByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getAllUserDataMessagesByFid(request: FidRequest, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAllUserDataMessagesByFid(
    request: FidRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  /** Sync Methods */
  getInfo(request: Empty, callback: (error: ServiceError | null, response: HubInfoResponse) => void): ClientUnaryCall;
  getInfo(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HubInfoResponse) => void,
  ): ClientUnaryCall;
  getInfo(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HubInfoResponse) => void,
  ): ClientUnaryCall;
  getAllSyncIdsByPrefix(
    request: TrieNodePrefix,
    callback: (error: ServiceError | null, response: SyncIds) => void,
  ): ClientUnaryCall;
  getAllSyncIdsByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SyncIds) => void,
  ): ClientUnaryCall;
  getAllSyncIdsByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SyncIds) => void,
  ): ClientUnaryCall;
  getAllMessagesBySyncIds(request: SyncIds, options?: Partial<CallOptions>): ClientReadableStream<Message>;
  getAllMessagesBySyncIds(
    request: SyncIds,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<Message>;
  getSyncMetadataByPrefix(
    request: TrieNodePrefix,
    callback: (error: ServiceError | null, response: TrieNodeMetadataResponse) => void,
  ): ClientUnaryCall;
  getSyncMetadataByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TrieNodeMetadataResponse) => void,
  ): ClientUnaryCall;
  getSyncMetadataByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TrieNodeMetadataResponse) => void,
  ): ClientUnaryCall;
  getSyncSnapshotByPrefix(
    request: TrieNodePrefix,
    callback: (error: ServiceError | null, response: TrieNodeSnapshotResponse) => void,
  ): ClientUnaryCall;
  getSyncSnapshotByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TrieNodeSnapshotResponse) => void,
  ): ClientUnaryCall;
  getSyncSnapshotByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TrieNodeSnapshotResponse) => void,
  ): ClientUnaryCall;
}

export const HubServiceClient = makeGenericClientConstructor(HubServiceService, "HubService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): HubServiceClient;
  service: typeof HubServiceService;
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}