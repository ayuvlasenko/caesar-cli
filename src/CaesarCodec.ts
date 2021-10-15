export class CaesarCodec {
    private readonly alphabets: string[];
    private readonly offset: number;

    constructor(alphabet: string, offset: number) {
        this.alphabets = [
            alphabet,
            alphabet.toUpperCase(),
        ];
        this.offset = offset;
    }

    encode(text: string): string {
        return this.replaceCharsWithOffset(text, this.offset);
    }

    decode(text: string): string {
        return this.replaceCharsWithOffset(text, -this.offset);
    }

    private replaceCharsWithOffset(text: string, offset: number): string {
        const encodedText: string[] = [];

        for (const char of text) {
            const replacementChar = this.findReplacementChar(
                char,
                offset
            );

            encodedText.push(replacementChar ?? char);
        }

        return encodedText.join("");
    }

    private findReplacementChar(
        char: string,
        offset: number
    ): string | undefined {
        for (const alphabet of this.alphabets) {
            const charIndex = alphabet.indexOf(char);

            if ( charIndex === -1 ) {
                continue;
            }

            const replacementCharIndex = this.calculateReplacementCharIndex(
                alphabet.length,
                charIndex,
                offset
            );

            const replacementChar = alphabet[replacementCharIndex];

            if ( replacementChar === undefined ) {
                throw Error("wrong replacement char index");
            }

            return replacementChar;
        }

        return undefined;
    }

    private calculateReplacementCharIndex(
        alphabetLength: number,
        charIndex: number,
        offset: number
    ): number {
        const replacementCharIndex = (charIndex + offset) % alphabetLength;
        return (
            replacementCharIndex >= 0
                ? replacementCharIndex
                : alphabetLength + replacementCharIndex
        );
    }
}
