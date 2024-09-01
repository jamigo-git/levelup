interface Resources {
  translation: {
    HomePage: {
      firstText: 'LevelUp is a game in which the player builds and places various defensive towers on the map in order to prevent enemies from passing through a certain route.'
      secondText: 'Enemies move along predefined paths, and towers automatically attack them. The player can upgrade towers and strategically place them for maximum efficiency.'
      thirdText: 'The main goal is to protect the base from waves of advancing enemies.'
      buttonText: 'Game'
    }
    ErrorPage: {
      message404: 'You got lost :)'
      message500: 'Something went wrong :)'
      buttonText: 'Go Back'
    }
    MainLayout: {
      profileLink: 'Profile'
      gameLink: 'Game'
      forumLink: 'Forum'
    }
    Profile: {
      title: 'Profile'
      emailLabel: 'Email'
      loginLabel: 'Login'
      firstNameLabel: 'First name'
      lastNameLabel: 'Last Name'
      nickNameLabel: 'Nickname'
      phoneLabel: 'Phone'
      editProfileButtonText: 'Edit Profile'
      saveButtonText: 'Save Changes'
      successMessage: 'Information successfully updated!'
      errorMessage: 'Error'
    }
    ProfileChangePassword: {
      changePasswordButtonText: 'Edit Password'
      title: 'Change Password'
      oldPassword: 'Old password'
      newPassword: 'New password'
      cancelButtonText: 'Cancel'
      changeButtonText: 'Change'
      successMessage: 'Password change successfully completed!'
      errorMessage: 'Password change failed'
    }
    Login: {
      title: 'Login'
      loginLabel: 'Login'
      passwordLabel: 'Password'
      loginButtonText: 'Authorize'
      registrationButtonText: 'Registration'
      successMessage: 'You have successfully logged in'
      errorMessage: 'Login error'
    }
    Registration: {
      title: 'Registration'
      firstNameLabel: 'First name'
      lastNameLabel: 'Last Name'
      emailLabel: 'Email'
      phoneLabel: 'Phone'
      loginLabel: 'Login'
      passwordLabel: 'Password'
      registrationButtonText: 'Register'
      loginButtonText: 'Authorization'
      successMessage: 'You have successfully register in'
      errorMessage: 'Register error'
    }
    ProfileAvatar: {
      successMessage: 'Avatar updated successfully!'
      errorMessage: 'Error updating avatar'
    }
    ForumPage: {
      Title: 'Forum'
    }
    GetTopicDescription: {
      message: 'messages'
    }
    ForumAddTopic: {
      addTopicButtonText: 'Add topic'
      ForumAddTopicModal: {
        forumAddTopicModalTitle: 'What shall we talk about?'
        topicTitlePlaceholder: 'Enter topic title'
        topicSubTitlePlaceholder: 'Will you add the first message?'
        cancelButtonText: 'Cancel'
        createButtonText: 'Create'
        requireRule: 'No topic, no go'
      }
    }
    ForumTopicPage: {
      topicTitle: 'Topic'
      error: 'Topic not found :('
    }
    ForumMessageList: {
      emptyText: 'Write the first message?'
    }
    ForumMessageForm: {
      topicMessageTextPlaceholder: 'Enter message'
      sendButtonText: 'Send'
      requireRule: 'Message is required'
    }
    ForumLoginSuggest: {
      buttonText: 'Login'
      explanation: ' to create topics and reply to messages'
    }
    CommentComponent: {
      replyButtonText: 'Reply'
      hideRepliesButtonText: 'Hide replies'
      showRepliesButtonText: 'Show replies'
    }
    StartScreen: {
      title: 'Best result!'
      maxWaves: 'Maximum number of waves passed'
      maxEnemiesKilled: 'Maximum number of enemies killed'
      startGameButtonText: 'Start game!'
    }
    EndScreen: {
      title: 'Game over!'
      maxWaves: 'Maximum number of waves passed'
      maxEnemiesKilled: 'Maximum number of enemies killed'
      waves: 'Waves passed'
      enemiesKilled: 'Enemies killed'
      repeatButtonText: 'Repeat?'
    }
    Game: {
      killsCount: 'Kills count'
      coinsCount: 'Coin count'
      stopButtonText: 'Stop game'
      towerCost: 'Tower costs'
      currency: 'coins!'
      expandButtonText: 'Expand to full screen'
      collapseButtonText: 'Collapse'
      notification: 'rang notification'
      notificationOne: 'rang notificationOne'
      notificationTwo: 'rang notificationTwo'
      notificationThree: 'rang notificationThree'
      notificationFour: 'rang notificationFour'
      notificationFive: 'rang notificationFive'
    }
  }
}

export default Resources
