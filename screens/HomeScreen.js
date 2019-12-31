import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar, Platform } from 'react-native'; 
import styled from "styled-components";
import Card from "../components/Card"
import Logo from "../components/Logo"
import Course from "../components/Course"
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";
import { NotificationIcon } from "../components/Icons";
import { connect } from 'react-redux';
import ModalLogin from '../components/ModalLogin';
 

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      }),
      openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN"
      })
  };
}

class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true); 
    if (Platform.OS === "android") StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu()
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue:0.9,
        duration:300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue:0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }
    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.scale, {
        toValue: 1,
        duration:300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();
      StatusBar.setBarStyle("dark-content", true)
    }
  };

  handleAvatar = () => {
    if(this.props.name !== "Stranger") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  }

  render() {
    return (
      <RootView>
      <Menu />
      <AnimatedContainer 
        style={{
        transform: [{ scale: this.state.scale }],
        opacity: this.state.opacity
      }}
       >
      
      <SafeAreaView>
        <ScrollView>
        <TitleBar>
          <TouchableOpacity onPress={this.handleAvatar} style={{ position:"absolute", top:0, left: 20 }} >
          <Avatar />
          </TouchableOpacity>
          <Title>Welcome back,</Title>
          <Name>{this.props.name}</Name>
          <NotificationIcon
          style={{ position: "absolute", right: 20, top: 5 }}
          />
        </TitleBar>

        <ScrollView
          style={{ flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 30 }}
          horizontal={true}
        >
        {logos.map((logo, index) => (
          <Logo key={index} image={logo.image} text={logo.text} />
        ))}
        </ScrollView>

        <Subtitle>
          {"Continue learning".toUpperCase()}
        </Subtitle>
        <ScrollView horizontal={true} style={{ paddingBottom: 30 }}>
        {cards.map((card, index) => (
          <TouchableOpacity
              key={index}
              onPress={() => {
                this.props.navigation.push("Section", {
                  section:card
                });
              }}
            >
          <Card
            key={index}
            title={card.title}
            image={card.image}
            subtitle={card.subtitle}
            caption={card.caption}
            logo={card.logo}
            content={card.content}
            />
            </TouchableOpacity>
        ))}
        </ScrollView>
        <Subtitle>
          {"Popular Courses".toUpperCase()}
        </Subtitle>
        <ScrollView horizontal={true} style={{ paddingBottom: 30 }}>
        <CoursesContainer>
        {courses.map((course, index) => (
          <TouchableOpacity
              key={index}
              onPress={() => {
                this.props.navigation.push("Section", {
                  section:course
                });
              }}
            >
          <Course
            key={index}
            image={course.image}
            title={course.title}
            subtitle={course.subtitle}
            logo={course.logo}
            author={course.author}
            avatar={course.avatar}
            caption={course.caption}
          />
          </TouchableOpacity>
        ))}
        </CoursesContainer>
          </ScrollView>
        </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
      <ModalLogin />
    </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootView = styled.View `
  background:black;
  flex:1;
`

const CoursesContainer = styled.View`
flex-direction: row;
flex-wrap: wrap;
padding-left: 10px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`

// const Avatar = styled.Image`
//   width: 44px;
//   height: 44px;
//   background: black;
//   border-radius: 22px;
//   top: 0;
//   left: 0;
// `;

const Container = styled.View`
  background: #f0f3f5;
  flex: 1;
  border-top-left-radius:10px;
  border-top-right-radius:10px;

`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch"
  }
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../assets/logo-react.png"),
    content: "some text"
  },
  {
    title: "Styled Components",
    image: require("../assets/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 sections",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Props and Icons",
    image: require("../assets/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 sections",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 sections",
    logo: require("../assets/logo-react.png")
  }
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design an interactive prototype"
  },
  {
    title: "React for Designers",
    subtitle: "12 sections",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn to design and code a React site"
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app"
  },
  {
    title: "Design System in Figma",
    subtitle: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool"
  }
];