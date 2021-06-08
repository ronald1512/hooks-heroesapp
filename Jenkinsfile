pipeline {
  agent {label 'master'}
  stages {
    stage('install') {
      steps {
          sh "npm install"
      }
    }

    stage('test') {
      steps {
        sh "npm run test"
      }
    }

    stage('build') {
      steps {
        echo "build"
      }
    }

  }
}