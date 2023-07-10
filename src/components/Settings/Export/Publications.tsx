
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import downloadJson from '@/lib/downloadJson';
import { PublicationTypes, PublicationsQueryRequest, useProfileFeedLazyQuery } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import { useState } from 'react';
import { useAppStore } from 'src/store/app';

const Publications: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [publications, setPublications] = useState<any[]>([]);
  const [exporting, setExporting] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const request: PublicationsQueryRequest = {
    profileId: currentProfile?.id,
    publicationTypes: [
      PublicationTypes.Post,
      PublicationTypes.Comment,
      PublicationTypes.Mirror
    ],
    limit: 50
  };

  const [exportPublications] = useProfileFeedLazyQuery({
    fetchPolicy: 'network-only'
  });

  const handleExportClick = async () => {
    
    setExporting(true);
    const fetchPublications = async (cursor?: string) => {
      const { data } = await exportPublications({
        variables: { request: { ...request, cursor } },
        onCompleted: (data) => {
          setPublications((prev) => {
            const newPublications = data.publications.items.filter(
              (newPublication) => {
                return !prev.some(
                  (publication) => publication.id === newPublication.id
                );
              }
            );

            return [...prev, ...newPublications];
          });
        }
      });

      if (
        data?.publications.items.length === 0 ||
        !data?.publications.pageInfo.next
      ) {
        setFetchCompleted(true);
        setExporting(false);
      } else {
        await fetchPublications(data?.publications.pageInfo.next);
      }
    };

    await fetchPublications();
  };

  const download = () => {
    downloadJson(publications, 'publications', () => {
      setPublications([]);
      setFetchCompleted(false);
    });
  };

  return (
    <Card className="space-y-2 p-5">
      <div className="text-lg font-bold">
        Export publications
      </div>
      <div className="pb-2">
        
          Export all your posts, comments and mirrors to a JSON file.
        
      </div>
      {publications.length > 0 ? (
        <div className="pb-2">
          
            Exported <b>{publications.length}</b> publications
          
        </div>
      ) : null}
      {fetchCompleted ? (
        <Button onClick={download}>
          Download publications
        </Button>
      ) : (
        <Button onClick={handleExportClick} disabled={exporting}>
          {exporting ? 'Exporting...' : 'Export now'}
        </Button>
      )}
    </Card>
  );
};

export default Publications;
