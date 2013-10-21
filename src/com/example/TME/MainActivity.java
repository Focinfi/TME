package com.example.TME;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.*;

public class MainActivity extends Activity {
    WebView TME_index;
    WebSettings TME_setting;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        TME_index = (WebView) this.findViewById(R.id.TME_index);
        TME_index.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onExceededDatabaseQuota(String url, String databaseIdentifier,
                                                long currentQuota, long estimatedSize,
                                                long totalUsedQuota, WebStorage.QuotaUpdater quotaUpdater) {
                quotaUpdater.updateQuota(estimatedSize * 2);
            }
        });
        TME_index.loadUrl("file:///android_asset/TME_index.html");

        String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath();

        TME_setting = TME_index.getSettings();
        TME_setting.setJavaScriptEnabled(true);
        TME_setting.getLoadsImagesAutomatically();
        TME_setting.setDomStorageEnabled(true);
        TME_setting.setAppCacheMaxSize(1024 * 1024 * 8);
        TME_setting.setAppCachePath(appCachePath);
        TME_setting.getAllowFileAccess();
        TME_setting.setAppCacheEnabled(true);
        TME_setting.setDatabaseEnabled(true);
        String dbPath = this.getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath();
        TME_setting.setDatabasePath(dbPath);
    }

    private class MyWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (Uri.parse(url).getHost().equals("www.zhihu.com")) {
                // This is my web site, so do not override; let my WebView load the page
                return false;
            }
            // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
            return true;
        }
    }

    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Check if the key event was the Back button and if there's history
        if ((keyCode == KeyEvent.KEYCODE_BACK) && TME_index.canGoBack()) {
            TME_index.goBack();
            return true;
        }
        // If it wasn't the Back key or there's no web page history, bubble up to the default
        // system behavior (probably exit the activity)
        return super.onKeyDown(keyCode, event);
    }

}
