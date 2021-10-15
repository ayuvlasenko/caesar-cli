export interface CaesarCLIOptions {
    action: "decode" | "encode";
    shift: number;
    input?: string;
    output?: string;
}

type KnownArgs = "-a" | "--action" | "-s" | "--shift" | "-i" | "--input" | "-o" | "--output";

const ARG_OPTION_MAP: { [arg in KnownArgs]: keyof CaesarCLIOptions } = {
    "-a": "action",
    "--action": "action",
    "-s": "shift",
    "--shift": "shift",
    "-i": "input",
    "--input": "input",
    "-o": "output",
    "--output": "output",
};

export class CaesarCLIOptionsParser {
    parse(argv: string[]): CaesarCLIOptions {
        const argPairs = Math.ceil(argv.length / 2);

        const options: Partial<CaesarCLIOptions> = {};
        for (let i = 0; i < argPairs; i++) {
            const [arg, value] = argv.slice(i * 2, i * 2 + 2);

            if ( arg === undefined ) {
                throw new Error("argument is undefined");
            }

            if ( !this.isKnownArg(arg) ) {
                throw new Error(`unknown argument '${ arg }'`);
            }

            const option = ARG_OPTION_MAP[arg];

            if ( options[option] !== undefined ) {
                throw Error(`duplicate argument '${ arg }'`);
            }

            if ( value === undefined ) {
                throw new Error(`argument '${ arg }' value is undefined`);
            }

            if ( option === "action" ) {
                options[option] = this.parseAction(value);
            }
            else if ( option === "shift" ) {
                options[option] = this.parseShift(value);
            }
            else if ( option === "input" ) {
                options[option] = value;
            }
            else if ( option === "output" ) {
                options[option] = value;
            }
        }

        if ( options.action === undefined ) {
            throw new Error("action argument is required");
        }

        if ( options.shift === undefined ) {
            throw new Error("shift argument is required");
        }

        return options as CaesarCLIOptions;
    }

    private parseAction(action: string): CaesarCLIOptions["action"] {
        if ( action !== "encode" && action !== "decode" ) {
            throw new Error(`invalid action '${ action }'`);
        }

        return action;
    }

    private parseShift(shift: string): CaesarCLIOptions["shift"] {
        const parsedShift = +shift;

        if ( isNaN(parsedShift) || parsedShift % 1 !== 0 ) {
            throw new Error(`invalid shift '${ shift }'`);
        }

        return parsedShift;
    }

    private isKnownArg(arg: unknown): arg is keyof typeof ARG_OPTION_MAP{
        return typeof arg === "string" && arg in ARG_OPTION_MAP;
    }
}
