export function matching(regex: RegExp,matchingText:string): RegExpMatchArray | null  {
    return matchingText.match(regex);
}