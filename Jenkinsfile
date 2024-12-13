pipeline {
    environment {
        BUCKET_NAME = 'abduljs-bucket'
        PROJECT_ID = 'hardy-binder-444609-a1'
        APP_PATH = 'account-upgrade/bo'
    }
    agent any
    tools {
        nodejs 'node19'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install -g pnpm'
                sh 'pnpm install'
            }
        }

        stage('Build') {
            steps {
                sh 'pnpm run build:bo'
            }
        }

        stage('Deploy to GCS') {
            steps {
                withCredentials([file(credentialsId: 'gcp-credentials', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh """
                        gcloud auth activate-service-account --key-file=\$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud config set project ${PROJECT_ID}
                        gsutil rsync -d -r dist/apps/bo-account-upgrade gs://${BUCKET_NAME}/${APP_PATH}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful! App available at: https://storage.googleapis.com/${BUCKET_NAME}/${APP_PATH}/index.html"
        }
    }
}