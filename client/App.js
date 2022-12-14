import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Alert} from 'react-native';
import CalendarView from './screens/calendarView';
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign , Ionicons} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DiaryWrite from './component/diaryWrite';
import DiaryLogin from './component/diaryLogin';
import DiaryJoin from './component/diaryJoin';
import DiaryInfo from './component/diaryInfo';
import { useContext, useEffect } from 'react';
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
        <Stack.Screen name="calendarView" component={CalendarView}  options={{ headerShown: false }} />
        <Stack.Screen name="diaryWrite" component={DiaryWrite}  />
        <Stack.Screen name="diaryDetail" component={DiaryDetail_yu} />
        <Stack.Screen name="modifyDetail" component={ModifyList} options={{ title: "리스트 수정", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        
      </Stack.Navigator>)
  }

  function ListNavigator() {
    return (
      <Stack.Navigator >
        <Stack.Screen name="diaryList" component={DiaryList} options={{ title: "리스트 목록", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        <Stack.Screen name="listDetail" component={DiaryDetail} options={{ title: "리스트 상세내용", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        <Stack.Screen name="modifyList" component={ModifyList} options={{ title: "리스트 수정", headerTitleStyle: { fontFamily: "GamjaFlower" } }} />
        <Stack.Screen name="writeList" component={DiaryWrite} options={{ headerShown: false}} />
      </Stack.Navigator>)
  }



  function GuestStackNavigator() {
    return (<Stack.Navigator initialRouteName='login' >
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
                  unmountOnBlur : true,
                title: "캘린더", 
                headerShown: false, 
                tabBarShowLabel:false,
                tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "ios-home" : "ios-home-outline"} color={focused ? "#333" : "#d0d0d0" } size={25} />
              }} />

              <Tab.Screen name="list" component={ListNavigator} options={{
                unmountOnBlur : true,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "grey",
                title: "리스트", 
                headerShown: false,
                tabBarShowLabel:false,
                tabBarIcon: ({ color, focused }) =>  <Ionicons name={focused ? "ios-albums" : "ios-albums-outline"} color={focused ? "#333" : "#d0d0d0" } size={25} />
              }} />
    
              <Tab.Screen name="set" component={AccountStackNavigator} options={{
                unmountOnBlur : true,
                tabBarActiveTintColor: "black", tabBarInactiveTintColor: "grey",

                title: "세팅", headerShown: false,   tabBarShowLabel:false, headerTitleStyle: { fontFamily: "GamjaFlower" },

                tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "ios-settings" : "ios-settings-outline"} color={focused ? "#333" : "#d0d0d0" } size={25} />
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
