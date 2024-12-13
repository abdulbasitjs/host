pipeline {
    agent any
    
    tools {
        nodejs 'node19' 
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh '''
                    npm install -g pnpm
                    pnpm install
                '''
            }
        }
        
        stage('Build BO App') {
            steps {
                echo 'Building BO Account Upgrade app...'
                sh 'pnpm run build:bo'  
                
                sh '''
                    echo "Build output contents:"
                    ls -la dist/apps/bo-account-upgrade
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Build completed successfully! 🎉'
        }
        failure {
            echo 'Build failed! 😢'
        }
    }
}