import Footer from '@/components/footer';
import LeadershipPageContent from './leadership-content';
import { leadershipService } from '@/services/leadership.service';

export const dynamic = 'force-dynamic';

export default async function LeadershipPage() {
  const { leadershipTeam, executiveTeam } = await leadershipService.getAllLeadershipData();

  return (
    <div className='bg-black min-h-screen'>
      <LeadershipPageContent 
        leadershipTeamData={leadershipTeam?.data || []}
        executiveTeamData={executiveTeam?.data || []}
      />
      <Footer />
    </div>
  );
}
