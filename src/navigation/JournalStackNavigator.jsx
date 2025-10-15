import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JournalListScreen from "../screens/Journal/JournalListScreen";
import Header from "../components/Header";
import EntryScreen from "../screens/Journal/EntryScreen";
import NewEntryScreen from "../screens/Journal/NewEntryScreen";
import JournalEntryHeader from "../components/journal/JournalEntryHeader";

const Stack = createNativeStackNavigator();

export default function JournalStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="My Journal Entries"
      screenOptions={{
        header: ({ route }) => <Header title={route.name} />,
      }}
    >
      <Stack.Screen 
        name="My Journal Entries" 
        component={JournalListScreen} 
      />
      <Stack.Screen 
        name="Journal Entry" 
        component={EntryScreen} 
        options={({route}) => ({
          header: () => <JournalEntryHeader 
            title={route.params?.entryTitle || route.name} 
            date={route.params?.entryDate || null}
            dateFormat={"MMMM d, yyyy"}
          />
        })}
      />
      <Stack.Screen 
        name="New Journal Entry" 
        component={NewEntryScreen}
        options={() => ({
          header: () => <JournalEntryHeader 
            title="New Journal Entry" 
            date={new Date()}
            dateFormat={"eeee, MMMM d, yyyy"}
          />
        })}
      />
    </Stack.Navigator>
  );
}
