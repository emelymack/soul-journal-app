import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JournalListScreen from "../screens/Journal/JournalListScreen";
import Header from "../components/Header";
import EntryScreen from "../screens/Journal/EntryScreen";
import NewEntryScreen from "../screens/Journal/NewEntryScreen";

const Stack = createNativeStackNavigator();

export default function JournalStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Journal Entries"
      screenOptions={{
        header: ({route}) => <Header title={route.name} />
      }}
    >
      <Stack.Screen name="Journal Entries" component={JournalListScreen} />
      <Stack.Screen name="Journal Entry" component={EntryScreen} />
      <Stack.Screen name="Create New Entry" component={NewEntryScreen} />
    </Stack.Navigator>
  )
};