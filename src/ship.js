export default function ship (length) {
    let hits = 0;

    const getHits = () => hits

    const hit = () => hits += 1;

    const isSunk = () => getHits() === length

    return { getHits, hit, isSunk }
}