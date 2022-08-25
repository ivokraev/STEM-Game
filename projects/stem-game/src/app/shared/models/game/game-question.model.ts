export interface IGameQuestion {
  id: number,
  question: string,
  answerType: "text" | "number",

}

export class GameQuestion implements IGameQuestion{
  constructor(
    public id: number,
    public question: string,
    public answerType: "text" | "number",
  ) {}
}

export type GameQuestions = IGameQuestion[];
