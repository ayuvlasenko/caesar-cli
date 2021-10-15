import { Transform, TransformCallback, TransformOptions } from "stream";
import { CaesarCodec } from "./CaesarCodec";

type TransformType = "encode" | "decode";

export class CesaerCodecTransform extends Transform {
    private transformType: TransformType;
    private cesaerCodec: CaesarCodec;

    constructor(
        transformType: TransformType,
        cesaerCodec: CaesarCodec,
        options?: TransformOptions
    ) {
        super(options);

        this.transformType = transformType;
        this.cesaerCodec = cesaerCodec;
    }

    _transform(
        chunk: unknown,
        _encoding: BufferEncoding,
        callback: TransformCallback
    ) {
        try {
            if ( Buffer.isBuffer(chunk) ) {
                const chunkString = chunk.toString("utf-8");

                const transformedChunkString = this.transformType === "decode"
                    ? this.cesaerCodec.decode(chunkString)
                    : this.cesaerCodec.encode(chunkString);

                const bufferChunkString = Buffer.from(
                    transformedChunkString,
                    "utf-8"
                );

                callback(null, bufferChunkString);
            }
            else {
                callback();
            }
        }
        catch(err) {
            if ( err instanceof Error || err === null || err === undefined ) {
                callback(err);
            }
            else {
                throw new Error(`Unexpected error type, error=${ JSON.stringify(err) }`);
            }
        }
    }
}
