import { Skeleton } from "@/app/_components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <>
      <div className="flex flex-col space-y-3 bg-white/70 p-6">
        <Skeleton className="h-full w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
