import { ExternalTokenizer } from "@lezer/lr"
import { Dot, FullStop } from "./parser.terms.js"

const eof = -1, newline = 10, period = 46, space = 32, tab = 9;

// This tokenizer is needed to determine whether a `.` is used as at the end of a sentence
// or as an operator.
export const dotOrFullStop = new ExternalTokenizer(input => {
    if (input.next !== period) {
        return;
    }

    input.advance();

    if (input.next === eof || input.next === newline || input.next === space || input.next == tab) {
        input.acceptToken(FullStop);
    }
    else {
        input.acceptToken(Dot);
    }
});
