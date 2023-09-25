export interface TabsProps {
  activePage: string;
  tablePages: string[];
  onChangeActivePage: (newActivePage: string) => void;
}
