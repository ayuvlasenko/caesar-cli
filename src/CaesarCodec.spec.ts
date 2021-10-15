import { CaesarCodec } from "./CaesarCodec";

describe("CaesarCodec", () => {
    const alphabet = "abcde";

    it("encoded decoded text is equal to original text", () => {
        const offset = 11;
        const text = "bad boy";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualText = caesarCodec.decode(
            caesarCodec.encode(text)
        );

        expect(actualText).toBe(text);
    });

    it("decoded encoded text is equal to original text", () => {
        const offset = 11;
        const text = "bad boy";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualText = caesarCodec.encode(
            caesarCodec.decode(text)
        );

        expect(actualText).toBe(text);
    });

    it("+offset: 0 < replacement char index < alphabet.length", () => {
        const text = "ab";
        const offset = 1;
        const expectedEncodedText = "bc";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("-offset: 0 < replacement char index < alphabet.length", () => {
        const text = "bc";
        const offset = -1;
        const expectedEncodedText = "ab";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("+offset: alphabet.length < replacement char index", () => {
        const text = alphabet;
        const offset = alphabet.length * 2 + 1;
        const expectedEncodedText = "bcdea";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("-offset: replacement char index < 0", () => {
        const text = alphabet;
        const offset = -alphabet.length + 1;
        const expectedEncodedText = "bcdea";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("offset = 0", () => {
        const text = alphabet;
        const offset = 0;
        const expectedEncodedText = alphabet;

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("offset = alphabet.length", () => {
        const text = alphabet;
        const offset = alphabet.length;
        const expectedEncodedText = alphabet;

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("offset = -alphabet.length", () => {
        const text = alphabet;
        const offset = -alphabet.length;
        const expectedEncodedText = alphabet;

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("doesn't change unknown chars", () => {
        const text = "09";
        const offset = 1;
        const expectedEncodedText = "09";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });

    it("replaces lower and upper case chars", () => {
        const text = "aaAA";
        const offset = 1;
        const expectedEncodedText = "bbBB";

        const caesarCodec = new CaesarCodec(alphabet, offset);
        const actualEncodedText = caesarCodec.encode(text);

        expect(actualEncodedText).toBe(expectedEncodedText);
    });
});
