pipeline {
    agent any
    
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World from Pipeline!'
                sh 'pwd' // print working directory
                sh 'ls -la' // list files
            }
        }
        
        stage('Branch Info') {
            steps {
                echo "Running on branch: ${env.BRANCH_NAME ?: 'undefined'}"
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully! 🎉'
        }
        failure {
            echo 'Pipeline failed! 😢'
        }
    }
}