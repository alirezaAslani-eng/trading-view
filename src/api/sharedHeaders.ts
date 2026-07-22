import { v4 as uuidv4 } from "uuid";

interface SharedHeadersImplementation {
  readonly "x-requestid": string;
}
class SharedHeaders implements SharedHeadersImplementation {
  readonly "x-requestid": string;
  constructor() {
    this["x-requestid"] = uuidv4();
  }
}

export { SharedHeaders };
