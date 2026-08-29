import { Entry } from "../types";
import ListItem from "./ListItem";

interface Props {
  entry: Entry;
  onPress: () => void;
}

export default function PersonListItem({ entry, onPress }: Readonly<Props>) {
  return (
    <ListItem
      name={entry.name}
      onPress={onPress}
      showAvatar={true}
      showArrow={true}
    />
  );
}
