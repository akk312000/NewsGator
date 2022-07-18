import { useQuery } from "@apollo/client";
import { BUNDLES_QUERY, FEEDS_QUERY } from "../utils/api/graphql/queries";
import {
  BundleObject,
  FeedObject,
  ItemType,
  SelectedFeedState,
} from "../utils/types";
import { ClockIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { OneListItem } from "./oneListItem";
import { Dispatch, SetStateAction, useEffect } from "react";

export const ItemList = ({
  type,
  selected,
  setSelected,
  useSelected = false,
  allowEdits = false,
}: {
  type: ItemType;
  selected?: SelectedFeedState;
  setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
  useSelected: boolean;
  allowEdits: boolean;
}) => {
  const isFeed = type === ItemType.FeedType;
  const { loading, error, data } = useQuery(
    isFeed ? FEEDS_QUERY : BUNDLES_QUERY
  );
  const { feeds, bundles } = data || {};
  const itemList = isFeed ? feeds : bundles;

  useEffect(() => {
    (async () => {
      if (
        useSelected &&
        itemList &&
        itemList.length > 0 &&
        selected.id == null
      ) {
        const firstItem = itemList[0];
        await setSelected({
          id: firstItem.id,
          feeds: isFeed ? [firstItem] : firstItem["feeds"],
          editMode: false,
          newMode: false,
        });
      }
    })();
  });

  if (loading) {
    return (
      <div className="h-screen flex">
        <ClockIcon className="h-10 w-10 text-gray-500 m-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex">
        <ExclamationCircleIcon className="h-10 w-10 text-gray-500 m-auto" />
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {itemList.length > 0 ? (
          itemList.map((item: FeedObject | BundleObject) => (
            <OneListItem
              type={type}
              item={item}
              key={item.id}
              useSelected={useSelected}
              allowEdits={allowEdits}
              selected={selected}
              setSelected={setSelected}
            />
          ))
        ) : (
          <p>None are present. Why not add one?</p>
        )}
      </div>
    </>
  );
};
