pipeline {
    agent any
    
    tools {
        nodejs 'node19' 
    }
    
    environment {
        PROJECT_ID = 'hardy-binder-444609-a1'
        BUCKET_NAME = ' abduljs-bucket'
        APP_PATH = 'bo-account-upgrade'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

         stage('Debug Environment') {
            steps {
                sh '''
                    echo "Checking PATH:"
                    echo $PATH
                    
                    echo "Checking if gcloud exists:"
                    which gcloud || echo "gcloud not found"
                    
                    echo "Listing installed packages:"
                    dpkg -l | grep google-cloud-sdk || echo "google-cloud-sdk not found in packages"
                    
                    echo "Checking current directory:"
                    pwd
                    
                    echo "Checking system information:"
                    uname -a
                '''
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
                    gcloud auth activate-service-account --key-file='gcp-key'
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