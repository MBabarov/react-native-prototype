import React, {Component} from 'react';
import { Platform, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Toast } from 'native-base';
import SignUpForm from "../../components/SignUpForm";



class SignUpScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  async componentWillReceiveProps(nextProps) {
    const {
      signUpData
    } = nextProps;

    if(signUpData.isFetching!==this.props.signUpData.isFetching){
      this.setState({
        isLoading: signUpData.isFetching
      })
    }


    if (signUpData.error && !signUpData.isFetching && !this.props.isFetching) {
      Toast.show({
        text: signUpData.error+'',
        textStyle: { color: "#ffffff" },
        buttonText: "Okay",
        duration: 2500,
        type: "danger"
      })
    }

    if (!signUpData.error && !signUpData.isFetching && !this.props.isFetching) {
      Toast.show({
        text: 'Sign up was successful',
        textStyle: { color: "#ffffff" },
        buttonText: "Okay",
        duration: 2500,
        type: "success"
      });
      this.props.navigation.navigate('Dashboard')
    }
  }

  render() {
    return (
      <Container style={styles.baseWrapper}>
        <Header  style={styles.headerWrapper}>
          <Left>
            <Button transparent  onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.backIcon} name='arrow-back' />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
          <Title style={styles.titleStyle}>Sign up</Title>
          </Body>
          <Right />
        </Header>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content style={styles.content} padder>
            <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
            <SignUpForm signUpUser={this.props.signUpUser} isLoading={this.state.isLoading} />
          </Content>
        </KeyboardAvoidingView>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#364E80',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff'
  },
  titleStyle: {
    color: '#ffffff'
  },
  headerBody: {
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-end'
  },
  backIcon: {
    color: '#ffffff'
  },
  content: {
    padding: 40,
  },
  logo: {
    width: 200,
    height: 97,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  baseWrapper: {
    backgroundColor: '#364E80'
  },
  button: {
    marginTop: 20,
    marginBottom: 80
  }
});
export default SignUpScreen;