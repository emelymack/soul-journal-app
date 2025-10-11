import { FlatList, StyleSheet, Text, View } from "react-native";
import entries from "../../data/entries.json";
import { useState } from "react";
import CustomText from "../../components/customText/CustomText";
import JournalListCard from "../../components/journal/JournalListCard";

const JournalListScreen = () => {
  const [journalEntries, setJournalEntries] = useState(entries || []);

  // console.log(journalEntries);

  return (
    <FlatList
      data={journalEntries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <JournalListCard
          text={item.text}
          date={item.date}
          image={item.image}
          location={item.location}
        />
      )}
      ListEmptyComponent={() => (
        <CustomText size={15} style={{ marginTop: 30 }}>
          No journal entries found...
        </CustomText>
      )}
    />
  );
};

export default JournalListScreen;

const styles = StyleSheet.create({});
