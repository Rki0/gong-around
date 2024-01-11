export interface InputProps {
  label: string;
  target: string;
  onInput: (target: string, value: string | File[]) => void;
  required?: boolean;
}
