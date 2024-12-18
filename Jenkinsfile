pipeline {
    agent any 
   
	 stages {
        stage('Build') {
            steps {
                script {
                        sh """ 
                        npm install
                        npm run build
			"""
                }
            }
        }
		stage('deploy') {
		   steps {
                script {
                        sh """ 
                        scp -o StrictHostKeyChecking=no -r /opt/jenkins-slave/workspace/kunnect-website_dev/dist/konnect-invictus/browser/* root@52.52.164.82:/var/www/html/
                        """
                }
            }
		
		}
   }
}

