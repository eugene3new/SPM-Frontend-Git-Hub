import NoContent from '@common/NoContent';
import { ProgressGroup, ProgressGroupItem } from '@cora/cora-component-library/dist';
import { useWizardSetup } from '@hooks/contextHook';
import React, { ReactNode } from 'react';
import { IWizardMappedGroup } from '../models';
import WizardSetupGroupDetails from '../WizardSetupGroupDetails';
import styles from './WizardSetupSections.module.scss';

interface WizardSetupSectionProps {
  groups: IWizardMappedGroup[];
}

const WizardSetupSections: React.FC<WizardSetupSectionProps> = ({ groups, children }) => {
  const { setActiveSection, activeSectionIndex, activeGroupIndex, sectionPercentages } = useWizardSetup();
  if (activeGroupIndex === null || activeSectionIndex === undefined) {
    return <NoContent text="There is no content for this group" />;
  }
  return (
    <>
      <ProgressGroup>
        {groups[activeGroupIndex] ? (
          groups[activeGroupIndex].sections.map((item, index) => {
            const percentage = sectionPercentages[activeGroupIndex] ? sectionPercentages[activeGroupIndex][index] : 0;
            return (
              <ProgressGroupItem
                key={item.id}
                isActive={index === activeSectionIndex}
                isFirst={index === 0}
                label={item.label}
                percentage={percentage}
                isComplete={false}
                onEdit={() => setActiveSection(index)}
                info={{
                  title: item.infoTitle,
                  description: item.details,
                  onAction: () => console.log('click'),
                }}
              />
            );
          })
        ) : (
          <NoContent text="No sections" />
        )}
      </ProgressGroup>
      <div className={styles.contentContainer}>
        {groups[activeGroupIndex] && activeSectionIndex !== null ? (
          <>
            {React.Children.map<ReactNode, ReactNode>(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { section: groups[activeGroupIndex].sections[activeSectionIndex] });
              }
              return child;
            })}
          </>
        ) : (
          <WizardSetupGroupDetails />
        )}
      </div>
    </>
  );
};

export default WizardSetupSections;
