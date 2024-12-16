pipeline {
    agent any
    
    tools {
        nodejs 'node19' 
    }
    
    environment {
        PROJECT_ID = 'hardy-binder-444609-a1'
        BUCKET_NAME = 'abduljs-bucket'
        APP_PATH = 'bo-account-upgrade'
        GCP_KEY_FILE = '/var/jenkins_home/gcr.json'
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
                sh 'pnpm install'
            }
        }
        
        stage('Build BO App') {
            steps {
                echo 'Building BO Account Upgrade app...'
                sh 'pnpm run build:bo'  
                sh 'ls -la dist/apps/bo-account-upgrade'
            }
        }
        

        stage('Deploy to GCS') {
            steps {
                sh """
                    gcloud auth activate-service-account --key-file=${GCP_KEY_FILE}
                    gcloud config set project ${PROJECT_ID}
                    gsutil rsync -d -r dist/apps/bo-account-upgrade gs://${BUCKET_NAME}/${APP_PATH}
                """
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