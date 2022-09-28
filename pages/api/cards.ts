import type { NextApiRequest, NextApiResponse } from "next";

// Response data type
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

// DB array
let cards: Card[] = [];

//primative id creator
let idCounter: number = 0;

// Sort priority
function comparePriority(a: Card, b: Card) {
  if (a.priority < b.priority) {
    return 1;
  }
  if (a.priority > b.priority) {
    return -1;
  }
  return 0;
}

// Sort ascending order (id: 0-1-2-3...)
function compareDateAsc(a: Card, b: Card) {
  if (a.created.getTime() > b.created.getTime()) {
    return 1;
  }
  if (a.created.getTime() < b.created.getTime()) {
    return -1;
  }
  return 0;
}

// Sort descending order (id: 3-2-1-0...)
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
    // check the sort method
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
    // increment id
    idCounter++;
    cards.push(newCard);
    let response: any = {
      success: true,
    };
    res.status(201).json(response);
  }
  if (req.method == "PATCH" && req.body) {
    // find the index of the card with the desired id
    let index = cards.findIndex((object) => {
      return object.id === req.body.cardId;
    });
    // update the card
    cards[index] = {
      header: req.body.newData.header,
      description: req.body.newData.description,
      priority: req.body.newData.priority,
      id: cards[index].id,
      created: cards[index].created,
    };
    let response: any = {
      success: true,
    };
    res.status(201).json(response);
  }
  if (req.method == "DELETE" && req.body) {
    let response: any = {
      success: true,
    };
    console.log(req.body.cardId);
    // new list without the card with the desired cardId
    let removed = cards.filter((card) => {
      return card.id != req.body.cardId;
    });

    // primivate way to sync the db
    cards = removed;

    res.status(200).json(response);
  }
}
