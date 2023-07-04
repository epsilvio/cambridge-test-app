export type ResultModalProps = {
  onConfirm: () => void;
  showResult: boolean;
  activity_name: string;
  order: number;
  questions: QuestionType[];
};

export type NextRoundModalProps = {
  onConfirm: () => void;
  show: boolean;
};

export type ActivityProps = {
  activity_name: string;
  order: number;
  questions: QuestionType[];
};

export type FormattedStringProps = {
  text: string;
};

export interface QuestionType {
  round_title?: string;
  questions?: Question[];
  is_correct?: boolean;
  stimulus?: string;
  order?: number;
  user_answers?: boolean[];
  feedback?: string;
}

export interface Question {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: boolean[];
  feedback: string;
}

export type HomeScreenProps = {
  name: string;
  description: string;
  activities: ActivityProps[];
};

export type GameScreenProps = {
  activity: ActivityProps;
};

export interface APIdata {
  name: string;
  heading: string;
  activities: ActivityProps[];
}
