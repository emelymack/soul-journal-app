import { StyleSheet, Text, View } from "react-native";
import entries from "../../data/entries.json";
import { useState } from "react";
import CustomText from "../../components/customText/CustomText";
import JournalListCard from "../../components/journal/JournalListCard";

const JournalListScreen = () => {
  const [journalEntries, setJournalEntries] = useState(entries || []);

  console.log(journalEntries);

  return (
    <View>
      {journalEntries.length > 0 ? (
        journalEntries.map((entry) => (
          <JournalListCard 
            key={entry.id} 
            text={entry.text} 
            date={entry.date}
            image={entry.image}
            location={entry.location}
          />
        ))
      ) : (
        <CustomText size={15} style={{ marginTop: 30 }}>No journal entries found.</CustomText>
      )}
    </View>
  );
};

export default JournalListScreen;

const styles = StyleSheet.create({});
