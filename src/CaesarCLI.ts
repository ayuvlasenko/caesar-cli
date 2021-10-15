import {
    createReadStream,
    createWriteStream,
    ReadStream,
    WriteStream,
} from "fs";
import { pipeline, Transform } from "stream";

import { CaesarCodec } from "./CaesarCodec";
import { CaesarCLIOptions, CaesarCLIOptionsParser } from "./CaesarCLIOptionsParser";
import { canReadFile, canWriteFile } from "./utility";
import { CesaerCodecTransform } from "./CesaerCodecTransform";

export class CaesarCLI {
    private readonly alphabet: string;
    private readonly options: CaesarCLIOptions;

    static async start(alphabet: string): Promise<void> {
        const optionsParser = new CaesarCLIOptionsParser();
        const options = optionsParser.parse(process.argv.slice(2));
        const { input, output } = options;

        if ( input !== undefined && !(await canReadFile(input)) ) {
            throw new Error(`cannot read file: ${ input }`);
        }

        if ( output !== undefined && !(await canWriteFile(output)) ) {
            throw new Error(`cannot write file: ${ output }`);
        }

        const cesaerCli = new CaesarCLI(alphabet, options);
        cesaerCli.start();
    }

    private constructor(alphabet: string, options: CaesarCLIOptions) {
        this.alphabet = alphabet;
        this.options = options;
    }

    private start() {
        const inputStream = this.prepareInputStream();
        const transform = this.prepareTransform();
        const outputStream = this.prepareOutputStream();

        pipeline(
            inputStream,
            transform,
            outputStream,
            (err) => {
                if ( err ) {
                    console.error("Pipeline failed", err);
                }
            }
        );
    }

    private prepareInputStream(): ReadStream | typeof process.stdin {
        const { input } = this.options;

        if ( input === undefined ) {
            return process.stdin;
        }

        return createReadStream(input);
    }

    private prepareTransform(): Transform {
        const { action, shift } = this.options;

        const cesaerCodec = new CaesarCodec(this.alphabet, shift);

        return new CesaerCodecTransform(action, cesaerCodec);
    }

    private prepareOutputStream(): WriteStream | typeof process.stdout {
        const { output } = this.options;

        if ( output === undefined ) {
            return process.stdout;
        }

        return createWriteStream(output, { flags: "a" });
    }
}
