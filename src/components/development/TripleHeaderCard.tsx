import { Card } from "../Card";
import styles from "./Card.module.css";

interface TripleHeaderCardProps {
  headers: [string, string, string];
  subtitle?: React.ReactNode | React.ReactNode[];
  content: React.ReactNode | React.ReactNode[];
  classes?: { [key: string]: string[] };
}

function TripleHeaderCard({
  headers,
  subtitle = "",
  content,
  classes = {
    header: [],
    subtitle: [],
    content: [],
  },
}: TripleHeaderCardProps) {
  const header = (
    <div className={styles.header}>
      <div className={styles.left}>{headers[0]}</div>
      <div className={styles.center}>{headers[1]}</div>
      <div className={styles.right}>{headers[2]}</div>
    </div>
  );
  return (
    <Card
      header={header}
      subtitle={subtitle}
      content={content}
      classes={{
        header: [...classes.header],
        subtitle: [styles.subtitle, ...classes.subtitle],
        content: [styles.body, ...classes.content],
      }}
    />
  );
}

export { TripleHeaderCard };
