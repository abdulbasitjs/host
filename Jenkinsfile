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
        stage('Install gcloud SDK') {
            steps {
                sh '''
                    # Install required dependencies
                    apt-get update && apt-get install -y apt-transport-https ca-certificates gnupg curl sudo

                    # Add Google Cloud SDK distribution URI as a package source
                    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

                    # Import the Google Cloud public key
                    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

                    # Update and install the Cloud SDK
                    apt-get update && apt-get install -y google-cloud-sdk
                    
                    # Verify installation
                    gcloud version
                '''
            }
        }

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
                withCredentials([file(credentialsId: 'hardy-binder-444609-a1-7452f38cd5be', variable: 'gcp-key')]) {
                    sh """
                        gcloud auth activate-service-account --key-file=\$GCP_KEY_FILE
                        gcloud config set project ${PROJECT_ID}
                        gsutil rsync -d -r dist/apps/bo-account-upgrade gs://${BUCKET_NAME}/${APP_PATH}
                    """
                }
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