pipeline {
    agent any
    
    tools {
        nodejs 'node19' 
    }
    
    environment {
        PROJECT_ID = 'hardy-binder-444609-a1'    // Replace with your GCP project ID
        BUCKET_NAME = ' abduljs-bucket'      // Replace with your GCS bucket name
        APP_PATH = 'bo-account-upgrade'       // The path in your bucket where files will be uploaded
        GOOGLE_APPLICATION_CREDENTIALS = credentials('hardy-binder-444609-a1-7452f38cd5be') // Assuming 'gcr-json-key' is your credentials ID
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

        stage('Deploy to GCS') {
            steps {
                sh """
                    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
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