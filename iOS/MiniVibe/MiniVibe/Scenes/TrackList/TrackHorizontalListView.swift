//
//  TrackHorizontalListView.swift
//  MiniVibe
//
//  Created by 류연수 on 2020/12/02.
//

import SwiftUI

struct TrackHorizontalListView: View {
    let tracks: [Track]
    private let layout = [
        GridItem(.fixed(60)),
        GridItem(.fixed(60)),
        GridItem(.fixed(60)),
        GridItem(.fixed(60)),
        GridItem(.fixed(60))
    ]
    
    var body: some View {
        Group {
            VStack {
                NavigationLink(destination: PlaylistView(playlistID: 1)) {
                    CategoryHeaderView(title: "오늘 TOP 100")
                        .foregroundColor(.primary)
                }
                ScrollView(.horizontal, showsIndicators: false) {
                    LazyHGrid(rows: layout,
                              spacing: 20) {
                        ForEach(tracks) { track -> TrackInfoView in
                            TrackInfoView(title: track.trackName,
                                          artist: track.artists.first?.name ?? "",
                                          coverURLString: track.album.cover)
                        }.frame(width: UIScreen.main.bounds.width - 64)
                    }
                }
            }
        }
    }
}

struct TrackHorizontalListView_Previews: PreviewProvider {
    static var previews: some View {
        TrackHorizontalListView(tracks: TestData.playlist.tracks!)
    }
}
