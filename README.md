Sample Node.js+MongoDB Beanstalk
================================

This sample demonstrates how to setup continuous integration and deployment for a Node.js+MongoDB project deployed using Amazon Elastic Beanstalk.
Additionally, it shows how to deploy different branches to separate Elastic Beanstalk environments.

Two approaches are available for handling deployment to multiple environments:

1. Use `eb use <env name>` command to associate your current branch with some environment.
Then, copy `.elasticbeanstalk/config.yml` file as `config.yml`.
You can also edit `config.yml` file manually. For example, to associate `prod` branch with `sample-nodejs-env-prod`, add the following
entry to your `config.yml` file:

        branch-defaults:
          ebcli-v3:
            environment: sample-nodejs-env
          prod:
            environment: sample-nodejs-env-prod

  Now, whenever `eb deploy` command is executed while the current branch is `prod`, it will automatically push the designated environment.

2. Pass the environment as an argument to `eb deploy` command in your `after_success` block.
You can choose the correct environment based on the value of the Shippable-supplied `BRANCH` variable:

        - >
          if [ $BRANCH = 'prod' ]; then
            ENV='sample-nodejs-env-prod'
          else
            ENV='sample-nodejs-env'
          fi
        - eb init && eb deploy $ENV

For more detailed documentation, please see Shippable's continuous deployment section. http://docs.shippable.com/en/latest/config.html#continuous-deployment

This sample is built for Shippable, a docker based continuous integration and deployment platform.
