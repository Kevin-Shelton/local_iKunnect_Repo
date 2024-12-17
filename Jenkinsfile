pipeline {
    agent any 
    environment {  
    }
	
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
   }
}
