import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    success: boolean;
    cards: Card[];
};

type Card = {
    id: number;
    header: string;
    description: string;
    priority: number;
    created: Date;
};

let cards: Card[] = [];
let idCounter: number = 0;

function comparePriority(a: Card, b: Card) {
    if (a.priority < b.priority) {
        return 1;
    }
    if (a.priority > b.priority) {
        return -1;
    }
    return 0;
}

function compareDateAsc(a: Card, b: Card) {
    if (a.created.getTime() > b.created.getTime()) {
        return 1;
    }
    if (a.created.getTime() < b.created.getTime()) {
        return -1;
    }
    return 0;
}

function compareDateDec(a: Card, b: Card) {
    if (a.created.getTime() < b.created.getTime()) {
        return 1;
    }
    if (a.created.getTime() > b.created.getTime()) {
        return -1;
    }
    return 0;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method == "GET") {
        if (req.headers.sort == "priority") {
            cards.sort(comparePriority);
        } else if (req.headers.sort == "descending") {
            cards.sort(compareDateDec);
        } else if (req.headers.sort == "ascending") {
            cards.sort(compareDateAsc);
        }
        let response: Data = {
            success: true,
            cards: cards,
        };
        res.status(200).json(response);
    }
    if (req.method == "POST" && req.body) {
        let newCard: Card = {
            id: idCounter,
            header: req.body.header,
            description: req.body.description,
            priority: req.body.priority,
            created: new Date(),
        };
        idCounter++;
        cards.push(newCard);
        let response: Data = {
            success: true,
            cards: cards,
        };
        res.status(201).json(response);
    }
}
