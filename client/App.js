import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CalendarView from './screens/calendarView';
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DiaryWrite from './component/diaryWrite';
import DiaryLogin from './component/diaryLogin';
import DiaryJoin from './component/diaryJoin';
import DiaryInfo from './component/diaryInfo';
import { useContext } from 'react';
import { AccountContext, AccountContextProvider, ContentContextProvider } from './context/context';
import DiaryDetail from './component/diaryDetail';
import ModifyList from './component/modifyList';
import DiaryDetail_yu from './component/diaryDetail_yu';
import DiaryList from './component/diaryList'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function App() {


  function CalendarNavigator() {
    return (
      <Stack.Navigator initialRouteName='calendarView'>
        <Stack.Screen name="calendarView" component={CalendarView} />
        <Stack.Screen name="diaryWrite" component={DiaryWrite} options={{ headerShown: false }} />
        <Stack.Screen name="diaryDetail" component={DiaryDetail_yu} />
        <Stack.Screen name="modifyDetail" component={ModifyList} options={{ title: "리스트 수정", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        
      </Stack.Navigator>)
  }

  function ListNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="diaryList" component={DiaryList} options={{ title: "리스트 목록", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        <Stack.Screen name="listDetail" component={DiaryDetail} options={{ title: "리스트 상세내용", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        <Stack.Screen name="modifyList" component={ModifyList} options={{ title: "리스트 수정", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        <Stack.Screen name="writeList" component={DiaryWrite} options={{ headerShown: false }} />
      </Stack.Navigator>)
  }



  function GuestStackNavigator() {
    return (<Stack.Navigator>
      <Stack.Screen name="login" component={DiaryLogin} options={{ title: "로그인", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
      <Stack.Screen name="join" component={DiaryJoin} options={{ title: "회원가입", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
    </Stack.Navigator>)
  }

  function MemberStackNavigator() {
    return (<Stack.Navigator>
      <Stack.Screen name="info" component={DiaryInfo} options={{ title: "내정보", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
    </Stack.Navigator>
    )
  }


  function AccountStackNavigator() {
    //const ctx = useContext(AppContext)  //use가 붙은 hook은 함수형컴포넌트에서만 사용가능
    const ctx = useContext(AccountContext)
    return (
      <>
        {ctx.auth ? <MemberStackNavigator /> : <GuestStackNavigator />}
      </>
    )
  }


  const [loaded] = useFonts({
    "GamjaFlower": require("./assets/fonts/GamjaFlower-Regular.ttf"),
  })

  if (!loaded) {
    return <></>
  }


  return (
    <>
      <StatusBar style="auto" />
      <AccountContextProvider>
        <ContentContextProvider>
          <NavigationContainer>
            <Tab.Navigator>

              <Tab.Screen 
                name="calendar" 
                component={CalendarNavigator} options={{
                  tabBarStyle:{/** bottom Tab이랑 헤더 스타일 어떻게 줄지 고민*/},
                title: "캘린더", 
                headerShown: false, 
                tabBarLabelStyle: { fontFamily: "GamjaFlower", fontSize: 12 }, headerTitleStyle: { fontFamily: "GamjaFlower" }, tabBarActiveTintColor: "black", tabBarInactiveTintColor: "grey",
                tabBarIcon: ({ color, focused }) => <AntDesign name="calendar" color={focused ? "black" : "grey"} size={25} style={{marginBottom:10}} />
              }} />

              <Tab.Screen name="list" component={ListNavigator} options={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "grey",
                title: "리스트", 
                headerShown: false,
                tabBarLabelStyle: { fontFamily: "GamjaFlower", fontSize: 12 }, headerTitleStyle: { fontFamily: "GamjaFlower" },
                tabBarIcon: ({ color, focused }) => <AntDesign name="bars" color={focused ? "black" : "grey"} size={25} style={{marginBottom:10}}/>
              }} />

              <Tab.Screen name="set" component={AccountStackNavigator} options={{
                tabBarActiveTintColor: "black", tabBarInactiveTintColor: "grey",
                title: "세팅", headerShown: false, tabBarLabelStyle: { fontFamily: "GamjaFlower", fontSize: 12 }, headerTitleStyle: { fontFamily: "GamjaFlower" },
                tabBarIcon: ({ color, focused }) => <AntDesign name="setting" color={focused ? "black" : "grey"} size={25} style={{marginBottom:10}}/>
              }} />

            </Tab.Navigator>
          </NavigationContainer>
        </ContentContextProvider>
      </AccountContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
