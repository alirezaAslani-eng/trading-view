interface SharedHeadersImplementation {
  readonly "x-requestid": string;
}
class SharedHeaders implements SharedHeadersImplementation {
  readonly "x-requestid": string;
  constructor() {
    this["x-requestid"] = crypto.randomUUID();
  }
}

export { SharedHeaders };
