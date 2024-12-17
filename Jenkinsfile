pipeline {
    agent any
    
    tools {
        nodejs 'node19' 
    }
    
    environment {
        PROJECT_ID = 'hardy-binder-444609-a1'
        BUCKET_NAME = 'abduljs-bucket'
        APP_PATH = 'bo-account-upgrade'
        GCP_KEY_FILE = '/var/jenkins_home/gcrbo.json'
        AWS_ACCESS_KEY_ID = 'AKIAQR5EPGLZDKKMCLX5'
        AWS_SECRET_ACCESS_KEY = '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'
        S3_BUCKET_NAME = 'mfe-host-account-upgrade'
        AWS_REGION = 'us-east-1'
        AWS_DISTRIBUTION_ID = 'E2XQMAQM6TT7XT'
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
                sh 'pnpm run build:apps'  
                sh 'ls -la dist/apps'
            }
        }


        // stage('Deploy to GCS') {
        //     steps {
        //         sh """
        //             gcloud auth activate-service-account --key-file=${GCP_KEY_FILE}
        //             gcloud config set project ${PROJECT_ID}
        //             gsutil rsync -d -r dist/apps/bo-account-upgrade gs://${BUCKET_NAME}/${APP_PATH}
        //         """
        //     }
        // }

         stage('Deploy to S3') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-key']]) {
                    sh """
                        export AWS_REGION=${AWS_REGION}
                        aws s3 sync dist/apps s3://${S3_BUCKET_NAME} --delete
                    """
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-key']]) {
                    sh """
                        aws cloudfront create-invalidation --distribution-id ${AWS_DISTRIBUTION_ID} --paths "/host/index.html"
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