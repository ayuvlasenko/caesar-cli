import { CaesarCLIOptions, CaesarCLIOptionsParser } from "./CaesarCLIOptionsParser";

describe("CaesarCLIOptionsParser", () => {
    const caesarCLIOptionsParser = new CaesarCLIOptionsParser();

    it("action can be 'decode'", () => {
        const argv = ["-a", "decode", "-s", "1"];

        const actualParsed = caesarCLIOptionsParser.parse(argv);
        const expectedParsed: CaesarCLIOptions = {
            action: "decode",
            shift: 1,
        };

        expect(actualParsed).toEqual(expectedParsed);
    });

    it("action can be 'encode'", () => {
        const argv = ["-a", "encode", "-s", "1"];

        const actualParsed = caesarCLIOptionsParser.parse(argv);
        const expectedParsed: CaesarCLIOptions = {
            action: "encode",
            shift: 1,
        };

        expect(actualParsed).toEqual(expectedParsed);
    });

    it("parses short arguments", () => {
        const argv = [
            "-a", "decode",
            "-s", "1",
            "-i", "/i.txt",
            "-o", "/o.txt",
        ];

        const actualParsed = caesarCLIOptionsParser.parse(argv);
        const expectedParsed: CaesarCLIOptions = {
            action: "decode",
            shift: 1,
            input: "/i.txt",
            output: "/o.txt",
        };

        expect(actualParsed).toEqual(expectedParsed);
    });

    it("parses long arguments", () => {
        const argv = [
            "-a", "decode",
            "--shift", "1",
            "--input", "/i.txt",
            "--output", "/o.txt",
        ];

        const actualParsed = caesarCLIOptionsParser.parse(argv);
        const expectedParsed: CaesarCLIOptions = {
            action: "decode",
            shift: 1,
            input: "/i.txt",
            output: "/o.txt",
        };

        expect(actualParsed).toEqual(expectedParsed);
    });

    it("action argument is required", () => {
        const argv = ["-s", "1"];

        expect(() => caesarCLIOptionsParser.parse(argv))
            .toThrow("action argument is required");
    });

    it("shift argument is required", () => {
        const argv = ["-a", "decode"];

        expect(() => caesarCLIOptionsParser.parse(argv))
            .toThrow("shift argument is required");
    });

    it("shift argument can be negative", () => {
        const argv = ["-a", "decode", "-s", "-1"];

        const actualParsed = caesarCLIOptionsParser.parse(argv);
        const expectedParsed: CaesarCLIOptions = {
            action: "decode",
            shift: -1,
        };

        expect(actualParsed).toEqual(expectedParsed);
    });

    it("throws unknown argument error", () => {
        const argv = [
            "-a", "decode",
            "-s", "1",
            "--unknown", "unknownValue",
        ];

        expect(() => caesarCLIOptionsParser.parse(argv))
            .toThrow("unknown argument '--unknown'");
    });

    it("throws duplicate argument error", () => {
        const argv = ["-a", "decode", "--action", "encode", "-s", "1"];

        expect(() => caesarCLIOptionsParser.parse(argv))
            .toThrow("duplicate argument '--action'");
    });

    it("throws invalid value for action argument", () => {
        const argv = ["-a", "decod", "-s", "1"];

        expect(() => caesarCLIOptionsParser.parse(argv))
            .toThrow("invalid action 'decod'");
    });

    it("throws invalid value for shift argument", () => {
        const argv1 = ["-a", "decode", "-s", "a1"];

        expect(() => caesarCLIOptionsParser.parse(argv1))
            .toThrow("invalid shift 'a1'");

        const argv2 = ["-a", "decode", "-s", "1.1"];

        expect(() => caesarCLIOptionsParser.parse(argv2))
            .toThrow("invalid shift '1.1'");
    });

    it("throws undefined argument value", () => {
        const argv = ["-a", "decode", "-s"];

        expect(() => caesarCLIOptionsParser.parse(argv))
            .toThrow("argument '-s' value is undefined");
    });
});
