import { Card } from '@cora/cora-component-library/dist';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Form } from 'react-bootstrap';
import React from 'react';
import { useContentLoadingSpinner } from '@hooks/contextHook';
import styles from './mainSetup.module.scss';
import { IWizardMappedOverview } from '../models';

interface WizardSetupOverviewProps {
  overviews: IWizardMappedOverview[];
  overviewPercentages: number[];
}

const WizardSetupOverview: React.FC<WizardSetupOverviewProps> = ({ overviews, overviewPercentages }) => {
  const router = useRouter();

  return (
    // TODO - Get images form one drive Opacity 70%
    <>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
        accumsan et viverra
      </div>
      <div className={styles.root}>
        <div className="row">
          {overviews.map((item, index) => (
            <div key={item.id} className={clsx(styles.setupCard, 'col-sm-12 col-md-6 col-lg-3')}>
              <Card
                background={{
                  color: item.backgroundColor,
                  imageURL: item.imageUrl,
                }}
                description={item.description}
                listItems={[]}
                onEdit={() => router.push(item.route)}
                percentage={overviewPercentages[index]}
                title={item.title}
              />
            </div>
          ))}
        </div>
      </div>
      <Form>
        <Form.Group className="mt-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Show this screen next time I log in" />
        </Form.Group>
      </Form>
    </>
  );
};

export default WizardSetupOverview;
